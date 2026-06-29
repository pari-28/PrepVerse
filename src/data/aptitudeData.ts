import { AptitudeQuestion } from '../types';

export const aptitudeQuestions: AptitudeQuestion[] = [
  {
    id: 'quant-1',
    category: 'Quantitative',
    question: 'A train 120 meters long passes a telegraph post in 6 seconds. What is the speed of the train in kilometers per hour?',
    options: ['72 km/h', '60 km/h', '80 km/h', '90 km/h'],
    correctIndex: 0,
    explanation: `**Step-by-Step Solution:**
1. First, calculate the speed of the train in meters per second (m/s).
   Speed = Distance / Time = 120 meters / 6 seconds = 20 m/s.
2. Next, convert the speed from m/s to km/h.
   To convert m/s to km/h, multiply by 18/5.
   Speed in km/h = 20 * (18 / 5) = 4 * 18 = 72 km/h.

Therefore, the correct speed of the train is **72 km/h**.`
  },
  {
    id: 'quant-2',
    category: 'Quantitative',
    question: 'A sum of money doubles itself at compound interest in 15 years. In how many years will it become eight times itself?',
    options: ['30 years', '45 years', '60 years', '120 years'],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. Under compound interest, a sum P becomes 2P in 15 years:
   P -> 2P (after 15 years)
2. In the next 15 years, the amount doubles again from 2P:
   2P -> 4P (after 30 years total)
3. In the next 15 years, it doubles once more:
   4P -> 8P (after 45 years total)

Alternative mathematical representation:
If $P(1+r/100)^{15} = 2P$, then $(1+r/100)^{15} = 2$.
We want the sum to be 8 times, which is $2^3$.
So, we raise the equation to power of 3:
$((1+r/100)^{15})^3 = 2^3 = 8$.
$(1+r/100)^{45} = 8$.

Thus, it will take **45 years**.`
  },
  {
    id: 'logical-1',
    category: 'Logical',
    question: 'Pointing to a photograph of a boy, Suresh said, "He is the son of the only child of my mother." How is Suresh related to that boy?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctIndex: 2,
    explanation: `**Step-by-Step Solution:**
1. Break down the statement made by Suresh:
   "The only child of my mother"
2. Since Suresh is speaking, his mother's only child is Suresh himself!
3. Therefore, "He is the son of [Suresh]."
4. This means Suresh is the boy's father.

Hence, Suresh is the **Father** of the boy.`
  },
  {
    id: 'logical-2',
    category: 'Logical',
    question: 'In a certain code, "COMPUTER" is written as "RFUVQNPC". How is "MEDICINE" written in that code?',
    options: ['EOJDJEFM', 'EOMDEJFM', 'DJFMEOMD', 'MFEJDJOE'],
    correctIndex: 0,
    explanation: `**Step-by-Step Solution:**
Let's analyze the pattern for "COMPUTER" -> "RFUVQNPC":
1. The first letter 'C' and the last letter 'R' swap places in terms of position:
   First letter becomes last, last letter becomes first. So, R......C.
2. The remaining middle letters 'O', 'M', 'P', 'U', 'T', 'E' are shifted by +1 in reverse order:
   - 'E' (+1) -> 'F'
   - 'T' (+1) -> 'U'
   - 'U' (+1) -> 'V'
   - 'P' (+1) -> 'Q'
   - 'M' (+1) -> 'N'
   - 'O' (+1) -> 'P'
3. Together: R + [F, U, V, Q, N, P] + C = RFUVQNPC.

Applying the same logic to "MEDICINE":
1. First letter 'M' and last letter 'E' swap places: E......M
2. The remaining letters are 'E', 'D', 'I', 'C', 'I', 'N'.
3. Shift them +1 in reverse order (starting from the back):
   - 'N' (+1) -> 'O'
   - 'I' (+1) -> 'J'
   - 'C' (+1) -> 'D'
   - 'I' (+1) -> 'J'
   - 'D' (+1) -> 'E'
   - 'E' (+1) -> 'F'
4. Combine: E + [O, J, D, J, E, F] + M = EOJDJEFM.

So, the correct code is **EOJDJEFM**.`
  },
  {
    id: 'verbal-1',
    category: 'Verbal',
    question: 'Choose the word that is most nearly opposite in meaning to: EPHEMERAL',
    options: ['Fleeting', 'Permanent', 'Transient', 'Delicate'],
    correctIndex: 1,
    explanation: `**Step-by-Step Solution:**
1. **EPHEMERAL** means lasting for a very short time; transient, fleeting.
2. Let's look at the options:
   - *Fleeting*: Synonymous with ephemeral (lasting a short time).
   - *Transient*: Synonymous with ephemeral.
   - *Delicate*: Fine, fragile; not an antonym.
   - *Permanent*: Lasting or intended to last indefinitely; enduring.
3. Therefore, "Permanent" is the antonym of Ephemeral.

Thus, the correct answer is **Permanent**.`
  }
];
