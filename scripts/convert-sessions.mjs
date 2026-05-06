#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sessionsDir = path.join(__dirname, '../sessions');
const outputDir = path.join(__dirname, '../data');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

/**
 * Parse markdown file with Title: and Video: headers
 */
function parseMdFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const metadata = {
    title: '',
    video: '',
  };

  let contentStart = 0;

  // Parse metadata
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('Title:')) {
      metadata.title = line.replace('Title:', '').trim();
    } else if (line.startsWith('Video:')) {
      metadata.video = line.replace('Video:', '').trim();
    } else if (line.trim() === '') {
      contentStart = i + 1;
      break;
    }
  }

  const body = lines.slice(contentStart).join('\n');
  return { metadata, body };
}

/**
 * Extract main summary from body
 */
function extractSummary(body) {
  // Try multiple possible section names
  const summaryMatch = body.match(/## (?:Κύρια αποτελέσματα|Σύνοψη συνεδρίας)\n\n([\s\S]*?)(?=\n## Θέματα|$)/);
  if (!summaryMatch) return '';
  
  const summaryText = summaryMatch[1];
  const lines = summaryText.split('\n').filter(l => l.trim() && !l.startsWith('-') && !l.startsWith('#'));
  return lines.join(' ').trim();
}

/**
 * Parse topics from markdown body
 */
function parseTopics(body) {
  const topics = [];
  const topicsMatch = body.match(/## Θέματα \/ αποφάσεις\n([\s\S]*?)(?=\n## Εκκρεμότητες|$)/);
  
  if (!topicsMatch) return topics;

  const topicsText = topicsMatch[1];
  const topicBlocks = topicsText.split(/\n### \d+\. /);

  topicBlocks.forEach((block, index) => {
    if (index === 0 || !block.trim()) return; // Skip first empty block

    const lines = block.split('\n');
    const title = lines[0].trim();
    
    const topic = {
      id: index,
      title,
      status: '',
      simple: '',
      votes: null,
      evidence: '',
      pdf: '',
      pdf_pages: '',
      certainty: '',
      why_matters: '',
    };

    // Parse fields - handle multiple field name variations
    lines.forEach(line => {
      if (line.startsWith('- Κατάσταση:') || line.startsWith('- **Κατάσταση:**')) {
        topic.status = line.replace(/^- \*\*?Κατάσταση:\*\*?/, '').trim();
      } else if (line.startsWith('- Με απλά λόγια:') || line.startsWith('- **Με απλά λόγια:**')) {
        topic.simple = line.replace(/^- \*\*?Με απλά λόγια:\*\*?/, '').trim();
      } else if (line.startsWith('- Ψηφοφορία:') || line.startsWith('- **Ψηφοφορία:**')) {
        const votesText = line.replace(/^- \*\*?Ψηφοφορία:\*\*?/, '').trim();
        // Try multiple vote formats
        let match = votesText.match(/Υπέρ (\d+),\s*Κατά (\d+),\s*Αποχές (\d+)/);
        if (!match) match = votesText.match(/(\d+)\s*✓\s*\|\s*(\d+)\s*✗\s*\|\s*(\d+)\s*–/);
        if (match) {
          topic.votes = {
            for: parseInt(match[1]),
            against: parseInt(match[2]),
            abstain: parseInt(match[3]),
          };
        }
      } else if (line.startsWith('- Απόδειξη:') || line.startsWith('- **Απόδειξη') || line.startsWith('- Απόδειξη από')) {
        topic.evidence = line.replace(/^- \*\*?Απόδειξη[^:]*:\*\*?/, '').trim();
      } else if (line.startsWith('- Σχετικό PDF:') || line.startsWith('- **Σχετικό PDF:**')) {
        const pdfText = line.replace(/^- \*\*?Σχετικό PDF:\*\*?/, '').trim();
        const pdfMatch = pdfText.match(/`(.+?)`,\s*σελ\.\s*(.+?)\.?$/);
        if (pdfMatch) {
          topic.pdf = pdfMatch[1];
          topic.pdf_pages = pdfMatch[2];
        } else {
          topic.pdf = pdfText;
        }
      } else if (line.startsWith('- Επίπεδο βεβαιότητας:') || line.startsWith('- **Επίπεδο βεβαιότητας:**')) {
        topic.certainty = line.replace(/^- \*\*?Επίπεδο βεβαιότητας:\*\*?/, '').trim();
      } else if (line.startsWith('- Γιατί έχει σημασία:') || line.startsWith('- **Γιατί έχει σημασία:**')) {
        topic.why_matters = line.replace(/^- \*\*?Γιατί έχει σημασία:\*\*?/, '').trim();
      }
    });

    // Include topic if it has at least a title (simple explanation is optional)
    if (topic.title) {
      topics.push(topic);
    }
  });

  return topics;
}

/**
 * Parse pending items
 */
function parsePending(body) {
  const pending = [];
  const pendingMatch = body.match(/## Εκκρεμότητες \/ αβεβαιότητες\n([\s\S]*?)$/);
  
  if (pendingMatch) {
    const pendingText = pendingMatch[1];
    pendingText.split('\n').forEach(line => {
      const cleaned = line.replace(/^[-*]\s*/, '').trim();
      if (cleaned) {
        pending.push(cleaned);
      }
    });
  }

  return pending;
}

/**
 * Extract date from title (e.g., "2026/01/29 - ..." -> "2026-01-29")
 */
function extractDate(title) {
  const match = title.match(/(\d{4})\/(\d{2})\/(\d{2})/);
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return new Date().toISOString().split('T')[0];
}

/**
 * Extract a unique session identifier from filename
 * Supports multiple sessions on the same day:
 * - 2026-01-29.md -> "2026-01-29"
 * - 2026-01-29-morning.md -> "2026-01-29-morning"
 * - 2026-01-29-A.md -> "2026-01-29-a"
 * - 2026-01-29-part-b.md -> "2026-01-29-part-b"
 */
function extractSessionId(filename) {
  // Remove .md extension
  const nameWithoutExt = filename.replace(/\.md$/, '');
  
  // Extract date part (YYYY-MM-DD)
  const dateMatch = nameWithoutExt.match(/^(\d{4}-\d{2}-\d{2})/);
  if (!dateMatch) {
    return nameWithoutExt.toLowerCase();
  }
  
  const date = dateMatch[1];
  const remainder = nameWithoutExt.substring(date.length).trim();
  
  // If there's additional info after the date, append it (lowercase, remove leading dashes/spaces)
  if (remainder) {
    const suffix = remainder.replace(/^[-\s]+/, '').toLowerCase();
    return `${date}-${suffix}`;
  }
  
  return date;
}

/**
 * Convert markdown file to session JSON
 */
function convertFile(filePath, filename) {
  console.log(`Converting ${filename}...`);

  const { metadata, body } = parseMdFile(filePath);
  const topics = parseTopics(body);
  const pending = parsePending(body);
  const date = extractDate(metadata.title);
  const sessionId = extractSessionId(filename);

  const session = {
    id: sessionId,
    title: metadata.title || '',
    date,
    youtube: metadata.video || '',
    summary: extractSummary(body),
    topics,
    pending: pending.length > 0 ? pending : undefined,
  };

  return { sessionId, session };
}

/**
 * Main conversion process
 */
function main() {
  if (!fs.existsSync(sessionsDir)) {
    console.error(`Sessions directory not found: ${sessionsDir}`);
    process.exit(1);
  }

  const mdFiles = fs.readdirSync(sessionsDir).filter(f => f.endsWith('.md'));
  
  if (mdFiles.length === 0) {
    console.warn('No .md files found in sessions directory');
    return;
  }

  const sessions = {};

  mdFiles.forEach(file => {
    try {
      const filePath = path.join(sessionsDir, file);
      const { sessionId, session } = convertFile(filePath, file);
      sessions[sessionId] = session;
    } catch (error) {
      console.error(`Error converting ${file}:`, error.message);
    }
  });

  // Write combined sessions.json
  const outputPath = path.join(outputDir, 'sessions.json');
  fs.writeFileSync(outputPath, JSON.stringify(sessions, null, 2));
  console.log(`✅ Converted ${Object.keys(sessions).length} sessions to ${outputPath}`);
}

main();
