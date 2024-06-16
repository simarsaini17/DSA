// LC:30 Substring with Concatenation of All Words

// You are given a string s and an array of strings words. All the strings of words are of the same length.

// A concatenated string is a string that exactly contains all the strings of any permutation of words concatenated.

// For example, if words = ["ab","cd","ef"], then "abcdef", "abefcd", "cdabef", "cdefab", "efabcd", and "efcdab" are all concatenated strings. "acdbef" is not a concatenated string because it is not the concatenation of any permutation of words.
// Return an array of the starting indices of all the concatenated substrings in s. You can return the answer in any order.

// Example 1:

// Input: s = "barfoothefoobarman", words = ["foo","bar"]

// Output: [0,9]

// Explanation:

// The substring starting at 0 is "barfoo". It is the concatenation of ["bar","foo"] which is a permutation of words.
// The substring starting at 9 is "foobar". It is the concatenation of ["foo","bar"] which is a permutation of words.

// Example 2:

// Input: s = "wordgoodgoodgoodbestword", words = ["word","good","best","word"]

// Output: []

// Explanation:

// There is no concatenated substring.

// Example 3:

// Input: s = "barfoofoobarthefoobarman", words = ["bar","foo","the"]

// Output: [6,9,12]

// Explanation:

// The substring starting at 6 is "foobarthe". It is the concatenation of ["foo","bar","the"].
// The substring starting at 9 is "barthefoo". It is the concatenation of ["bar","the","foo"].
// The substring starting at 12 is "thefoobar". It is the concatenation of ["the","foo","bar"].

function findSubstring(s: string, words: string[]): number[] {
  const eachWordLength = words[0].length;
  const wordsLength = words.length;
  const substringLength = eachWordLength * wordsLength;
  let wordsCountMap = new Map<String, number>();
  for (let i = 0; i < words.length; i++) {
    if (wordsCountMap.has(words[i])) {
      wordsCountMap.set(words[i], wordsCountMap.get(words[i]) + 1);
    } else {
      wordsCountMap.set(words[i], 1);
    }
  }

  let countArr: number[] = [];
  if (s.length < substringLength) {
    return countArr;
  }

  // slide window over string s

  for (let i = 0; i <= s.length - substringLength; i++) {
    let temp = new Map(wordsCountMap);
    let j = i;
    let count = wordsLength;

    while (j < i + substringLength) {
      const word = s.substring(j, j + eachWordLength);
      if (temp.has(word) === false || temp.get(word) === 0) {
        break;
      } else {
        temp.set(word, temp.get(word) - 1);
        count -= 1;
      }
      j += eachWordLength;
    }

    if (count == 0) {
      countArr.push(i);
    }
  }
  return countArr;
}

findSubstring("wordgoodgoodgoodbestword", ["bar", "foo", "the"]);
