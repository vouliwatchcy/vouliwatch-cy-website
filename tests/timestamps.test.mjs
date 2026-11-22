import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import vm from 'node:vm';

const appSource = fs.readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
const helperSource = appSource.split('// Load sessions data')[0];
const context = { URL };
vm.runInNewContext(`${helperSource}\nthis.linkifyTimestamps = linkifyTimestamps;`, context);

const { linkifyTimestamps } = context;

test('linkifies current evidence timestamps using each starting time', () => {
  const evidence = 'Στις 00:21:45 έγινε η κατάθεση. Στις 01:05:41–01:05:55 εξηγήθηκε η παράταση.';
  const result = linkifyTimestamps(evidence, 'https://www.youtube.com/watch?v=jOgctltXB_Q');

  assert.match(result, /href="https:\/\/www\.youtube\.com\/live\/jOgctltXB_Q\?t=1305s"[^>]*>00:21:45<\/a>/);
  assert.match(result, /href="https:\/\/www\.youtube\.com\/live\/jOgctltXB_Q\?t=3941s"[^>]*>01:05:41–01:05:55<\/a>/);
});

test('accepts standard YouTube watch, live and short URLs', () => {
  for (const url of [
    'https://www.youtube.com/watch?v=jOgctltXB_Q',
    'https://www.youtube.com/live/jOgctltXB_Q',
    'https://m.youtube.com/shorts/jOgctltXB_Q',
    'https://youtu.be/jOgctltXB_Q',
  ]) {
    const result = linkifyTimestamps('00:01:02', url);
    assert.match(result, /href="https:\/\/www\.youtube\.com\/live\/jOgctltXB_Q\?t=62s"/);
  }
});

test('preserves supported bracket and range separators as link text', () => {
  for (const value of [
    '[00:01:02]',
    '00:01:02-00:01:05',
    '[00:01:02]–[00:01:05]',
    '00:01:02 — 00:01:05',
  ]) {
    const result = linkifyTimestamps(value, 'https://youtu.be/jOgctltXB_Q');
    assert.ok(result.endsWith(`>${value}</a>`));
  }
});

test('rejects non-YouTube URLs', () => {
  for (const url of [
    'https://example.com/watch?v=jOgctltXB_Q',
    'https://notyoutube.com/live/jOgctltXB_Q',
    'ftp://www.youtube.com/watch?v=jOgctltXB_Q',
    'javascript://www.youtube.com/watch?v=jOgctltXB_Q',
    'https://youtu.be/jOgctltXB_Q/extra',
    'https://www.youtube.com/live/jOgctltXB_Q/extra',
    'https://www.youtube.com/shorts/jOgctltXB_Q/extra',
    'not a URL?v=jOgctltXB_Q',
  ]) {
    assert.equal(linkifyTimestamps('00:01:02', url), '00:01:02');
  }
});

test('rejects invalid or embedded timestamp-like values', () => {
  for (const value of [
    '100:00:00',
    '2026:11:19',
    'x00:00:01y',
    '00:60:00',
    '00:00:60',
    'x[00:00:01]',
    '[00:00:01]x',
    '00:00:01-00:00:02x',
    'x00:00:01-00:00:02',
    '[ 00:00:01 ]',
    '00:60:00 - 00:00:01',
    '[bad] - 00:00:01',
    '00:60:00 – [00:00:01]',
  ]) {
    assert.equal(linkifyTimestamps(value, 'https://youtu.be/jOgctltXB_Q'), value);
  }
});
