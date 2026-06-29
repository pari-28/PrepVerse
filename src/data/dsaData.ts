import { DsaProblem } from '../types';

export const dsaProblems: DsaProblem[] = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft', 'Apple'],
    sheets: ['Blind 75', 'NeetCode 150', 'Striver Sheet'],
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.
You may assume that each input would have exactly one solution, and you may not use the same element twice.
You can return the answer in any order.`,
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.'
    ],
    sampleInput: 'nums = [2,7,11,15], target = 9',
    sampleOutput: '[0,1]',
    editorial: `### Approach: Hash Map (Single Pass)
By using a hash map to store the index of each number, we can look up if the complement of the current element (\`target - nums[i]\`) exists in O(1) time complexity.

**Complexity Analysis:**
- **Time Complexity:** O(N) where N is the length of the array. We traverse the list containing N elements only once.
- **Space Complexity:** O(N) since the extra space required depends on the number of items stored in the hash map.`,
    videoUrl: 'https://www.youtube.com/embed/KLlXCFG5Tk0',
    codeTemplate: `function twoSum(nums: number[], target: number): number[] {
    const map = new Map<number, number>();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement)!, i];
        }
        map.set(nums[i], i);
    }
    return [];
};`
  },
  {
    id: 'valid-anagram',
    title: 'Valid Anagram',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    companyTags: ['Amazon', 'Microsoft', 'Apple'],
    sheets: ['Blind 75', 'NeetCode 150'],
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    constraints: [
      '1 <= s.length, t.length <= 5 * 10^4',
      's and t consist of lowercase English letters.'
    ],
    sampleInput: 's = "anagram", t = "nagaram"',
    sampleOutput: 'true',
    editorial: `### Approach: Frequency Array
Create a frequency array of size 26 (for english alphabets). Increment counts for character occurrences in \`s\`, and decrement for characters in \`t\`. If all values are 0 at the end, return true.

**Complexity Analysis:**
- **Time Complexity:** O(N) to iterate over the strings.
- **Space Complexity:** O(1) since we only use a fixed size alphabet counter.`,
    videoUrl: 'https://www.youtube.com/embed/g8FMMEv_qgM',
    codeTemplate: `function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;
    const counts = new Array(26).fill(0);
    for (let i = 0; i < s.length; i++) {
        counts[s.charCodeAt(i) - 97]++;
        counts[t.charCodeAt(i) - 97]--;
    }
    return counts.every(val => val === 0);
};`
  },
  {
    id: 'reverse-linked-list',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    category: 'Linked List',
    companyTags: ['Meta', 'Amazon', 'Microsoft', 'Google'],
    sheets: ['Blind 75', 'NeetCode 150', 'Striver Sheet'],
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.`,
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    sampleInput: 'head = [1,2,3,4,5]',
    sampleOutput: '[5,4,3,2,1]',
    editorial: `### Approach: Iterative Pointer Swapping
We can reverse the linked list in-place by maintaining three pointers: \`prev\`, \`curr\`, and \`next\`. For each node, point its \`next\` to its \`prev\`, then shift the pointers forward.

**Complexity Analysis:**
- **Time Complexity:** O(N) where N is the number of nodes in the list.
- **Space Complexity:** O(1) auxiliary space.`,
    videoUrl: 'https://www.youtube.com/embed/G0_I-ZF0S38',
    codeTemplate: `/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
function reverseList(head: ListNode | null): ListNode | null {
    let prev: ListNode | null = null;
    let curr = head;
    while (curr !== null) {
        let nextTemp = curr.next;
        curr.next = prev;
        prev = curr;
        curr = nextTemp;
    }
    return prev;
};`
  },
  {
    id: 'lru-cache',
    title: 'LRU Cache',
    difficulty: 'Medium',
    category: 'Linked List',
    companyTags: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    sheets: ['NeetCode 150', 'Striver Sheet'],
    description: `Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the \`LRUCache\` class:
- \`LRUCache(capacity)\` Initialize the LRU cache with positive size capacity.
- \`get(key)\` Return the value of the \`key\` if the key exists, otherwise return \`-1\`.
- \`put(key, value)\` Update the value of the \`key\` if the \`key\` exists. Otherwise, add the \`key-value\` pair to the cache. If the number of keys exceeds the capacity, evict the least recently used key.

The functions \`get\` and \`put\` must each run in \`O(1)\` average time complexity.`,
    constraints: [
      '1 <= capacity <= 3000',
      '0 <= key <= 10^4',
      '0 <= value <= 10^5',
      'At most 2 * 10^5 calls will be made to get and put.'
    ],
    sampleInput: '["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]',
    sampleOutput: '[null, null, null, 1, null, -1, null, -1, 3, 4]',
    editorial: `### Approach: Hash Map + Doubly Linked List
A doubly linked list helps maintain the insertion order and access history in O(1) insertions and deletions, while a hash map maps keys to list nodes for O(1) access.

When a node is accessed or updated, move it to the head of the list. When capacity is exceeded, evict the tail node.`,
    videoUrl: 'https://www.youtube.com/embed/7ABFKpk2hGQ',
    codeTemplate: `class LRUCache {
    private capacity: number;
    private cache: Map<number, number>;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key: number): number {
        if (!this.cache.has(key)) return -1;
        const val = this.cache.get(key)!;
        this.cache.delete(key);
        this.cache.set(key, val);
        return val;
    }

    put(key: number, value: number): void {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        } else if (this.cache.size >= this.capacity) {
            const firstKey = this.cache.keys().next().value;
            if (firstKey !== undefined) {
                this.cache.delete(firstKey);
            }
        }
        this.cache.set(key, value);
    }
}`
  },
  {
    id: 'edit-distance',
    title: 'Edit Distance',
    difficulty: 'Hard',
    category: 'Dynamic Programming',
    companyTags: ['Google', 'Amazon', 'Meta', 'Microsoft'],
    sheets: ['Striver Sheet'],
    description: `Given two strings \`word1\` and \`word2\`, return the minimum number of operations required to convert \`word1\` to \`word2\`.

You have the following three operations permitted on a word:
1. Insert a character
2. Delete a character
3. Replace a character`,
    constraints: [
      '0 <= word1.length, word2.length <= 500',
      'word1 and word2 consist of lowercase English letters.'
    ],
    sampleInput: 'word1 = "horse", word2 = "ros"',
    sampleOutput: '3',
    editorial: `### Approach: 2D Dynamic Programming
Let \`dp[i][j]\` be the minimum operations to convert \`word1[0...i-1]\` to \`word2[0...j-1]\`.
If \`word1[i-1] == word2[j-1]\`, no operation needed: \`dp[i][j] = dp[i-1][j-1]\`.
Otherwise, take the minimum of:
- **Insert**: \`dp[i][j-1] + 1\`
- **Delete**: \`dp[i-1][j] + 1\`
- **Replace**: \`dp[i-1][j-1] + 1\`

**Complexity Analysis:**
- **Time Complexity:** O(M * N) where M and N are string lengths.
- **Space Complexity:** O(M * N) space for the DP grid, can be optimized to O(N).`,
    videoUrl: 'https://www.youtube.com/embed/XYi2-LPrWM4',
    codeTemplate: `function minDistance(word1: string, word2: string): number {
    const m = word1.length;
    const n = word2.length;
    const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (word1[i-1] === word2[j-1]) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = Math.min(
                    dp[i-1][j] + 1,    // deletion
                    dp[i][j-1] + 1,    // insertion
                    dp[i-1][j-1] + 1   // replacement
                );
            }
        }
    }
    return dp[m][n];
};`
  }
];
