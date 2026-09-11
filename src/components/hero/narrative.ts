export const NEURONS = ["a", "b", "c"] as const;
const OVERLAP = 0.06;
const STRIDE = 1 - OVERLAP;
const TOTAL = 2 - OVERLAP;
const clamp = (value: number) => Math.max(0, Math.min(1, value));

/** Travel continuously from A → B → C. The chapter copy advances in thirds as
 * each incoming neuron becomes visually dominant, while the final state stays C.
 */
export function getNarrative(progress: number) {
  const p = clamp(progress);
  const time = p * TOTAL;
  const sequence = time < 1 - 1e-9 ? 0 : 1;
  const flightProgress = p === 1 ? 1 : clamp(time - sequence * STRIDE);
  const blend = sequence === 0 ? clamp((flightProgress - STRIDE) / OVERLAP) : 0;
  // Copy changes when the incoming neuron is visually established, not at an
  // arbitrary equal scroll division. The second supplied flight reveals C later.
  const story = p < 0.34 ? 0 : p < 0.835 ? 1 : 2;
  return {
    sequence,
    story,
    flightProgress,
    nextProgress: Math.max(0, flightProgress - STRIDE),
    blend: blend * blend * (3 - 2 * blend),
  };
}

export interface MotionState { position: number; velocity: number }

const PLAYBACK_RATE = 0.22;

/** Move toward the requested scroll position at one linear playback rate. Scroll
 * distance only changes the destination; it never accelerates the footage.
 */
export function advanceMotion(state: MotionState, target: number, seconds: number): MotionState {
  const dt = Math.min(seconds, 0.064);
  const distance = target - state.position;
  const step = PLAYBACK_RATE * dt;
  if (Math.abs(distance) <= step) return { position: target, velocity: 0 };
  const direction = Math.sign(distance);
  return {
    position: clamp(state.position + direction * step),
    velocity: direction * PLAYBACK_RATE,
  };
}
