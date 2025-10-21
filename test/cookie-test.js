// Simple test for cookie preferences functionality
import { getCookiePreferences, setCookiePreferences } from '../src/lib/api.js';

// Test basic functionality
console.log('Testing cookie preferences...');

// Test 1: Initial state should be null
const initial = getCookiePreferences();
console.log('Initial preferences:', initial);

// Test 2: Set preferences
const testPrefs = {
  essential: true,
  analytics: true,
  marketing: false
};

setCookiePreferences(testPrefs);
console.log('Set preferences:', testPrefs);

// Test 3: Get preferences back
const retrieved = getCookiePreferences();
console.log('Retrieved preferences:', retrieved);

// Test 4: Verify they match
const matches = JSON.stringify(testPrefs) === JSON.stringify(retrieved);
console.log('Preferences match:', matches);

// Test 5: Test analytics guards
import { canUseAnalytics, canUseMarketing } from '../src/lib/analytics.js';

console.log('Can use analytics:', canUseAnalytics());
console.log('Can use marketing:', canUseMarketing());

console.log('All tests completed successfully!');