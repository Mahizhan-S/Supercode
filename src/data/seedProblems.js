// Master LeetCode Question Bank — 200+ problems organized by topic
// Status: 'todo' = Not Started | Confidence: 1 = unrated
// Tag field for NeetCode 75 / Must-Do tracking

const now = new Date().toISOString();
let _id = 0;
const P = (number, title, difficulty, topic, tag = '') => ({
  id: `seed-${++_id}`,
  title,
  number,
  difficulty,
  topic,
  tag,
  status: 'todo',
  notes: '',
  url: number ? `https://leetcode.com/problems/${title.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-')}/` : '',
  dateAdded: now,
  dateSolved: null,
  lastRevised: null,
  revisionCount: 0,
  confidence: 1,
  timeSpent: null,
});

export const SEED_PROBLEMS = [
  // ═══════════════════════════════════════════
  // 1) ARRAYS + HASHING
  // ═══════════════════════════════════════════
  P(1,   'Two Sum',                          'Easy',   'Arrays & Hashing', 'NeetCode 75'),
  P(217, 'Contains Duplicate',               'Easy',   'Arrays & Hashing', 'NeetCode 75'),
  P(242, 'Valid Anagram',                     'Easy',   'Arrays & Hashing', 'NeetCode 75'),
  P(349, 'Intersection of Two Arrays',       'Easy',   'Arrays & Hashing'),
  P(169, 'Majority Element',                 'Easy',   'Arrays & Hashing'),
  P(724, 'Find Pivot Index',                 'Easy',   'Arrays & Hashing'),
  P(121, 'Best Time to Buy and Sell Stock',  'Easy',   'Arrays & Hashing', 'NeetCode 75'),
  P(118, 'Pascals Triangle',                 'Easy',   'Arrays & Hashing'),
  P(268, 'Missing Number',                   'Easy',   'Arrays & Hashing'),
  P(136, 'Single Number',                    'Easy',   'Arrays & Hashing'),
  P(49,  'Group Anagrams',                   'Medium', 'Arrays & Hashing', 'NeetCode 75'),
  P(347, 'Top K Frequent Elements',          'Medium', 'Arrays & Hashing', 'NeetCode 75'),
  P(238, 'Product of Array Except Self',     'Medium', 'Arrays & Hashing', 'NeetCode 75'),
  P(128, 'Longest Consecutive Sequence',     'Medium', 'Arrays & Hashing', 'NeetCode 75'),
  P(75,  'Sort Colors',                      'Medium', 'Arrays & Hashing'),
  P(560, 'Subarray Sum Equals K',            'Medium', 'Arrays & Hashing', 'Must Do'),
  P(442, 'Find All Duplicates in an Array',  'Medium', 'Arrays & Hashing'),
  P(73,  'Set Matrix Zeroes',                'Medium', 'Arrays & Hashing'),
  P(48,  'Rotate Image',                     'Medium', 'Arrays & Hashing'),
  P(271, 'Encode and Decode Strings',        'Medium', 'Arrays & Hashing', 'NeetCode 75'),
  P(41,  'First Missing Positive',           'Hard',   'Arrays & Hashing'),
  P(135, 'Candy',                            'Hard',   'Arrays & Hashing'),
  P(42,  'Trapping Rain Water',              'Hard',   'Arrays & Hashing', 'Must Do'),
  P(918, 'Maximum Sum Circular Subarray',    'Hard',   'Arrays & Hashing'),
  P(239, 'Sliding Window Maximum',           'Hard',   'Arrays & Hashing', 'Must Do'),

  // ═══════════════════════════════════════════
  // 2) TWO POINTERS
  // ═══════════════════════════════════════════
  P(125, 'Valid Palindrome',                     'Easy',   'Two Pointers', 'NeetCode 75'),
  P(344, 'Reverse String',                      'Easy',   'Two Pointers'),
  P(88,  'Merge Sorted Array',                  'Easy',   'Two Pointers'),
  P(283, 'Move Zeroes',                         'Easy',   'Two Pointers', 'Must Do'),
  P(26,  'Remove Duplicates from Sorted Array', 'Easy',   'Two Pointers'),
  P(977, 'Squares of a Sorted Array',           'Easy',   'Two Pointers'),
  P(167, 'Two Sum II Input Array Is Sorted',    'Medium', 'Two Pointers', 'NeetCode 75'),
  P(15,  '3Sum',                                'Medium', 'Two Pointers', 'NeetCode 75'),
  P(11,  'Container With Most Water',           'Medium', 'Two Pointers', 'NeetCode 75'),
  P(881, 'Boats to Save People',                'Medium', 'Two Pointers'),
  P(763, 'Partition Labels',                    'Medium', 'Two Pointers', 'Must Do'),
  P(948, 'Bag of Tokens',                       'Medium', 'Two Pointers'),
  P(18,  '4Sum',                                'Hard',   'Two Pointers'),

  // ═══════════════════════════════════════════
  // 3) SLIDING WINDOW
  // ═══════════════════════════════════════════
  P(643,  'Maximum Average Subarray I',                              'Easy',   'Sliding Window'),
  P(219,  'Contains Duplicate II',                                   'Easy',   'Sliding Window'),
  P(3,    'Longest Substring Without Repeating Characters',          'Medium', 'Sliding Window', 'NeetCode 75'),
  P(424,  'Longest Repeating Character Replacement',                 'Medium', 'Sliding Window', 'NeetCode 75'),
  P(567,  'Permutation in String',                                   'Medium', 'Sliding Window', 'Must Do'),
  P(209,  'Minimum Size Subarray Sum',                               'Medium', 'Sliding Window'),
  P(904,  'Fruit Into Baskets',                                      'Medium', 'Sliding Window'),
  P(1456, 'Maximum Number of Vowels in a Substring of Given Length', 'Medium', 'Sliding Window'),
  P(930,  'Binary Subarrays With Sum',                               'Medium', 'Sliding Window'),
  P(1343, 'Number of Subarrays of Size K and Average Greater Than or Equal to Threshold', 'Medium', 'Sliding Window'),
  P(438,  'Find All Anagrams in a String',                           'Medium', 'Sliding Window'),
  P(76,   'Minimum Window Substring',                                'Hard',   'Sliding Window', 'NeetCode 75'),
  P(992,  'Subarrays with K Different Integers',                     'Hard',   'Sliding Window'),

  // ═══════════════════════════════════════════
  // 4) STACK
  // ═══════════════════════════════════════════
  P(20,  'Valid Parentheses',              'Easy',   'Stack', 'NeetCode 75'),
  P(682, 'Baseball Game',                  'Easy',   'Stack'),
  P(232, 'Implement Queue using Stacks',   'Easy',   'Stack'),
  P(844, 'Backspace String Compare',       'Easy',   'Stack'),
  P(155, 'Min Stack',                      'Medium', 'Stack', 'NeetCode 75'),
  P(739, 'Daily Temperatures',             'Medium', 'Stack', 'NeetCode 75'),
  P(150, 'Evaluate Reverse Polish Notation','Medium', 'Stack', 'NeetCode 75'),
  P(22,  'Generate Parentheses',           'Medium', 'Stack', 'NeetCode 75'),
  P(853, 'Car Fleet',                      'Medium', 'Stack', 'NeetCode 75'),
  P(402, 'Remove K Digits',                'Medium', 'Stack'),
  P(71,  'Simplify Path',                  'Medium', 'Stack'),
  P(735, 'Asteroid Collision',             'Medium', 'Stack'),
  P(394, 'Decode String',                  'Medium', 'Stack'),
  P(901, 'Online Stock Span',              'Medium', 'Stack'),
  P(84,  'Largest Rectangle in Histogram', 'Hard',   'Stack', 'NeetCode 75'),
  P(224, 'Basic Calculator',               'Hard',   'Stack'),
  P(85,  'Maximal Rectangle',              'Hard',   'Stack'),

  // ═══════════════════════════════════════════
  // 5) BINARY SEARCH
  // ═══════════════════════════════════════════
  P(704,  'Binary Search',                                       'Easy',   'Binary Search', 'NeetCode 75'),
  P(35,   'Search Insert Position',                              'Easy',   'Binary Search'),
  P(374,  'Guess Number Higher or Lower',                        'Easy',   'Binary Search'),
  P(278,  'First Bad Version',                                   'Easy',   'Binary Search'),
  P(367,  'Valid Perfect Square',                                'Easy',   'Binary Search'),
  P(74,   'Search a 2D Matrix',                                  'Medium', 'Binary Search', 'NeetCode 75'),
  P(33,   'Search in Rotated Sorted Array',                      'Medium', 'Binary Search', 'NeetCode 75'),
  P(153,  'Find Minimum in Rotated Sorted Array',                'Medium', 'Binary Search', 'NeetCode 75'),
  P(875,  'Koko Eating Bananas',                                 'Medium', 'Binary Search', 'NeetCode 75'),
  P(1011, 'Capacity To Ship Packages Within D Days',             'Medium', 'Binary Search', 'Must Do'),
  P(162,  'Find Peak Element',                                   'Medium', 'Binary Search'),
  P(981,  'Time Based Key-Value Store',                          'Medium', 'Binary Search', 'NeetCode 75'),
  P(34,   'Find First and Last Position of Element in Sorted Array', 'Medium', 'Binary Search'),
  P(4,    'Median of Two Sorted Arrays',                         'Hard',   'Binary Search', 'NeetCode 75'),
  P(410,  'Split Array Largest Sum',                             'Hard',   'Binary Search'),

  // ═══════════════════════════════════════════
  // 6) LINKED LIST
  // ═══════════════════════════════════════════
  P(206, 'Reverse Linked List',                 'Easy',   'Linked List', 'NeetCode 75'),
  P(21,  'Merge Two Sorted Lists',              'Easy',   'Linked List', 'NeetCode 75'),
  P(141, 'Linked List Cycle',                   'Easy',   'Linked List', 'NeetCode 75'),
  P(83,  'Remove Duplicates from Sorted List',  'Easy',   'Linked List'),
  P(876, 'Middle of the Linked List',           'Easy',   'Linked List'),
  P(234, 'Palindrome Linked List',              'Easy',   'Linked List'),
  P(160, 'Intersection of Two Linked Lists',    'Easy',   'Linked List'),
  P(143, 'Reorder List',                        'Medium', 'Linked List', 'NeetCode 75'),
  P(19,  'Remove Nth Node From End of List',    'Medium', 'Linked List', 'NeetCode 75'),
  P(2,   'Add Two Numbers',                     'Medium', 'Linked List', 'Must Do'),
  P(138, 'Copy List with Random Pointer',       'Medium', 'Linked List', 'Must Do'),
  P(24,  'Swap Nodes in Pairs',                 'Medium', 'Linked List'),
  P(61,  'Rotate List',                         'Medium', 'Linked List'),
  P(328, 'Odd Even Linked List',                'Medium', 'Linked List'),
  P(148, 'Sort List',                           'Medium', 'Linked List'),
  P(23,  'Merge K Sorted Lists',                'Hard',   'Linked List', 'NeetCode 75'),
  P(25,  'Reverse Nodes in K-Group',            'Hard',   'Linked List', 'NeetCode 75'),
  P(146, 'LRU Cache',                           'Hard',   'Linked List'),

  // ═══════════════════════════════════════════
  // 7) TREES
  // ═══════════════════════════════════════════
  P(226,  'Invert Binary Tree',                                    'Easy',   'Tree', 'NeetCode 75'),
  P(104,  'Maximum Depth of Binary Tree',                          'Easy',   'Tree', 'NeetCode 75'),
  P(100,  'Same Tree',                                             'Easy',   'Tree', 'NeetCode 75'),
  P(572,  'Subtree of Another Tree',                               'Easy',   'Tree', 'NeetCode 75'),
  P(110,  'Balanced Binary Tree',                                  'Easy',   'Tree', 'Must Do'),
  P(111,  'Minimum Depth of Binary Tree',                          'Easy',   'Tree'),
  P(112,  'Path Sum',                                              'Easy',   'Tree'),
  P(543,  'Diameter of Binary Tree',                               'Easy',   'Tree', 'Must Do'),
  P(102,  'Binary Tree Level Order Traversal',                     'Medium', 'Tree', 'NeetCode 75'),
  P(98,   'Validate Binary Search Tree',                           'Medium', 'Tree', 'NeetCode 75'),
  P(230,  'Kth Smallest Element in a BST',                         'Medium', 'Tree', 'NeetCode 75'),
  P(235,  'Lowest Common Ancestor of a BST',                       'Medium', 'Tree', 'NeetCode 75'),
  P(236,  'Lowest Common Ancestor of a Binary Tree',               'Medium', 'Tree', 'Must Do'),
  P(199,  'Binary Tree Right Side View',                           'Medium', 'Tree', 'NeetCode 75'),
  P(1448, 'Count Good Nodes in Binary Tree',                       'Medium', 'Tree', 'NeetCode 75'),
  P(105,  'Construct Binary Tree from Preorder and Inorder Traversal','Medium','Tree', 'NeetCode 75'),
  P(113,  'Path Sum II',                                           'Medium', 'Tree'),
  P(337,  'House Robber III',                                      'Medium', 'Tree'),
  P(297,  'Serialize and Deserialize Binary Tree',                 'Hard',   'Tree', 'NeetCode 75'),
  P(124,  'Binary Tree Maximum Path Sum',                          'Hard',   'Tree', 'NeetCode 75'),
  P(99,   'Recover Binary Search Tree',                            'Hard',   'Tree'),

  // ═══════════════════════════════════════════
  // 8) HEAPS / PRIORITY QUEUE
  // ═══════════════════════════════════════════
  P(1046, 'Last Stone Weight',               'Easy',   'Heap', 'Must Do'),
  P(703,  'Kth Largest Element in a Stream',  'Easy',   'Heap'),
  P(215,  'Kth Largest Element in an Array',  'Medium', 'Heap', 'Must Do'),
  P(621,  'Task Scheduler',                   'Medium', 'Heap', 'Must Do'),
  P(973,  'K Closest Points to Origin',       'Medium', 'Heap', 'Must Do'),
  P(658,  'Find K Closest Elements',          'Medium', 'Heap'),
  P(767,  'Reorganize String',                'Medium', 'Heap'),
  P(295,  'Find Median from Data Stream',     'Hard',   'Heap', 'NeetCode 75'),
  P(451,  'Sort Characters By Frequency',     'Medium', 'Heap'),
  P(502,  'IPO',                              'Hard',   'Heap'),

  // ═══════════════════════════════════════════
  // 9) INTERVALS
  // ═══════════════════════════════════════════
  P(252, 'Meeting Rooms',                           'Easy',   'Intervals'),
  P(228, 'Summary Ranges',                          'Easy',   'Intervals'),
  P(56,  'Merge Intervals',                         'Medium', 'Intervals', 'NeetCode 75'),
  P(57,  'Insert Interval',                         'Medium', 'Intervals', 'NeetCode 75'),
  P(435, 'Non-overlapping Intervals',               'Medium', 'Intervals', 'NeetCode 75'),
  P(253, 'Meeting Rooms II',                        'Medium', 'Intervals', 'Must Do'),
  P(452, 'Minimum Number of Arrows to Burst Balloons','Medium','Intervals', 'Must Do'),
  P(986, 'Interval List Intersections',              'Medium', 'Intervals'),
  P(759, 'Employee Free Time',                       'Hard',   'Intervals'),
  P(352, 'Data Stream as Disjoint Intervals',        'Hard',   'Intervals'),

  // ═══════════════════════════════════════════
  // 10) GREEDY
  // ═══════════════════════════════════════════
  P(455, 'Assign Cookies',                        'Easy',   'Greedy'),
  P(860, 'Lemonade Change',                       'Easy',   'Greedy'),
  P(605, 'Can Place Flowers',                     'Easy',   'Greedy'),
  P(55,  'Jump Game',                             'Medium', 'Greedy', 'NeetCode 75'),
  P(45,  'Jump Game II',                          'Medium', 'Greedy', 'Must Do'),
  P(134, 'Gas Station',                           'Medium', 'Greedy', 'Must Do'),
  P(846, 'Hand of Straights',                     'Medium', 'Greedy', 'Must Do'),
  P(1899,'Merge Triplets to Form Target Triplet', 'Medium', 'Greedy', 'NeetCode 75'),
  P(678, 'Valid Parenthesis String',               'Medium', 'Greedy'),
  P(406, 'Queue Reconstruction by Height',         'Medium', 'Greedy'),
  P(871, 'Minimum Number of Refueling Stops',      'Hard',   'Greedy'),

  // ═══════════════════════════════════════════
  // 11) BACKTRACKING
  // ═══════════════════════════════════════════
  P(17,  'Letter Combinations of a Phone Number', 'Medium', 'Backtracking'),
  P(78,  'Subsets',                                'Medium', 'Backtracking', 'NeetCode 75'),
  P(90,  'Subsets II',                             'Medium', 'Backtracking'),
  P(46,  'Permutations',                           'Medium', 'Backtracking', 'Must Do'),
  P(47,  'Permutations II',                        'Medium', 'Backtracking'),
  P(39,  'Combination Sum',                        'Medium', 'Backtracking', 'NeetCode 75'),
  P(40,  'Combination Sum II',                     'Medium', 'Backtracking', 'Must Do'),
  P(131, 'Palindrome Partitioning',                'Medium', 'Backtracking', 'Must Do'),
  P(79,  'Word Search',                            'Medium', 'Backtracking', 'Must Do'),
  P(93,  'Restore IP Addresses',                   'Medium', 'Backtracking'),
  P(51,  'N-Queens',                               'Hard',   'Backtracking', 'Must Do'),
  P(37,  'Sudoku Solver',                          'Hard',   'Backtracking'),
  P(212, 'Word Search II',                         'Hard',   'Backtracking', 'NeetCode 75'),

  // ═══════════════════════════════════════════
  // 12) GRAPHS
  // ═══════════════════════════════════════════
  P(1971, 'Find if Path Exists in Graph',     'Easy',   'Graph'),
  P(733,  'Flood Fill',                        'Easy',   'Graph'),
  P(200,  'Number of Islands',                 'Medium', 'Graph', 'NeetCode 75'),
  P(133,  'Clone Graph',                       'Medium', 'Graph', 'NeetCode 75'),
  P(994,  'Rotting Oranges',                   'Medium', 'Graph', 'Must Do'),
  P(417,  'Pacific Atlantic Water Flow',       'Medium', 'Graph', 'NeetCode 75'),
  P(130,  'Surrounded Regions',                'Medium', 'Graph', 'Must Do'),
  P(207,  'Course Schedule',                   'Medium', 'Graph', 'NeetCode 75'),
  P(210,  'Course Schedule II',                'Medium', 'Graph', 'Must Do'),
  P(261,  'Graph Valid Tree',                  'Medium', 'Graph', 'NeetCode 75'),
  P(684,  'Redundant Connection',              'Medium', 'Graph', 'Must Do'),
  P(286,  'Walls and Gates',                   'Medium', 'Graph'),
  P(721,  'Accounts Merge',                    'Medium', 'Graph', 'Must Do'),
  P(743,  'Network Delay Time',                'Medium', 'Graph', 'Must Do'),
  P(787,  'Cheapest Flights Within K Stops',   'Medium', 'Graph'),
  P(127,  'Word Ladder',                       'Hard',   'Graph', 'Must Do'),
  P(269,  'Alien Dictionary',                  'Hard',   'Graph', 'NeetCode 75'),
  P(778,  'Swim in Rising Water',              'Hard',   'Graph'),

  // ═══════════════════════════════════════════
  // 13) UNION FIND
  // ═══════════════════════════════════════════
  P(547,  'Number of Provinces',               'Medium', 'Union Find'),
  P(1584, 'Min Cost to Connect All Points',    'Medium', 'Union Find'),
  P(305,  'Number of Islands II',              'Hard',   'Union Find'),
  P(839,  'Similar String Groups',             'Hard',   'Union Find'),

  // ═══════════════════════════════════════════
  // 14) DYNAMIC PROGRAMMING
  // ═══════════════════════════════════════════
  P(70,   'Climbing Stairs',                               'Easy',   'Dynamic Programming', 'NeetCode 75'),
  P(746,  'Min Cost Climbing Stairs',                      'Easy',   'Dynamic Programming', 'Must Do'),
  P(198,  'House Robber',                                  'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(213,  'House Robber II',                               'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(322,  'Coin Change',                                   'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(300,  'Longest Increasing Subsequence',                'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(1143, 'Longest Common Subsequence',                    'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(416,  'Partition Equal Subset Sum',                    'Medium', 'Dynamic Programming', 'Must Do'),
  P(139,  'Word Break',                                    'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(91,   'Decode Ways',                                   'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(62,   'Unique Paths',                                  'Medium', 'Dynamic Programming', 'NeetCode 75'),
  P(152,  'Maximum Product Subarray',                      'Medium', 'Dynamic Programming', 'Must Do'),
  P(647,  'Palindromic Substrings',                        'Medium', 'Dynamic Programming', 'Must Do'),
  P(343,  'Integer Break',                                 'Medium', 'Dynamic Programming'),
  P(494,  'Target Sum',                                    'Medium', 'Dynamic Programming', 'Must Do'),
  P(377,  'Combination Sum IV',                            'Medium', 'Dynamic Programming'),
  P(309,  'Best Time to Buy and Sell Stock with Cooldown', 'Medium', 'Dynamic Programming'),
  P(72,   'Edit Distance',                                 'Hard',   'Dynamic Programming', 'Must Do'),
  P(312,  'Burst Balloons',                                'Hard',   'Dynamic Programming'),
  P(115,  'Distinct Subsequences',                         'Hard',   'Dynamic Programming', 'Must Do'),
  P(10,   'Regular Expression Matching',                   'Hard',   'Dynamic Programming'),
  P(32,   'Longest Valid Parentheses',                     'Hard',   'Dynamic Programming'),

  // ═══════════════════════════════════════════
  // 15) 2D DYNAMIC PROGRAMMING
  // ═══════════════════════════════════════════
  P(64,  'Minimum Path Sum',       'Medium', '2D Dynamic Programming'),
  P(97,  'Interleaving String',    'Medium', '2D Dynamic Programming'),
  P(120, 'Triangle',               'Medium', '2D Dynamic Programming'),
  P(518, 'Coin Change II',         'Medium', '2D Dynamic Programming'),

  // ═══════════════════════════════════════════
  // 16) TRIES
  // ═══════════════════════════════════════════
  P(208, 'Implement Trie Prefix Tree',                   'Medium', 'Trie', 'NeetCode 75'),
  P(211, 'Design Add and Search Words Data Structure',   'Medium', 'Trie', 'NeetCode 75'),
  P(648, 'Replace Words',                                'Medium', 'Trie'),

  // ═══════════════════════════════════════════
  // 17) BIT MANIPULATION
  // ═══════════════════════════════════════════
  P(191, 'Number of 1 Bits',                         'Easy',   'Bit Manipulation', 'NeetCode 75'),
  P(338, 'Counting Bits',                             'Easy',   'Bit Manipulation', 'NeetCode 75'),
  P(190, 'Reverse Bits',                              'Easy',   'Bit Manipulation', 'NeetCode 75'),
  P(231, 'Power of Two',                              'Easy',   'Bit Manipulation'),
  P(371, 'Sum of Two Integers',                       'Medium', 'Bit Manipulation', 'NeetCode 75'),
  P(201, 'Bitwise AND of Numbers Range',              'Medium', 'Bit Manipulation'),
  P(421, 'Maximum XOR of Two Numbers in an Array',    'Hard',   'Bit Manipulation'),

  // ═══════════════════════════════════════════
  // 18) MATH / MISC
  // ═══════════════════════════════════════════
  P(66,  'Plus One',                'Easy',   'Math'),
  P(202, 'Happy Number',            'Easy',   'Math'),
  P(69,  'Sqrt x',                  'Easy',   'Math'),
  P(13,  'Roman to Integer',        'Easy',   'Math'),
  P(171, 'Excel Sheet Column Number','Easy',   'Math'),
  P(50,  'Pow x n',                 'Medium', 'Math'),
  P(43,  'Multiply Strings',        'Medium', 'Math'),
  P(54,  'Spiral Matrix',           'Medium', 'Math'),
  P(273, 'Integer to English Words', 'Hard',   'Math'),
];

export const SEED_TOPICS = [
  'Arrays & Hashing', 'Two Pointers', 'Sliding Window', 'Stack',
  'Binary Search', 'Linked List', 'Tree', 'Heap',
  'Intervals', 'Greedy', 'Backtracking', 'Graph',
  'Union Find', 'Dynamic Programming', '2D Dynamic Programming',
  'Trie', 'Bit Manipulation', 'Math',
];
