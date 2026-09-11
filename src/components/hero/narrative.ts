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

const MOTION_RESPONSE = 18;
const SETTLED_DISTANCE = 0.0001;
const SETTLED_VELOCITY = 0.001;

/** Follow the requested scroll position with a short, critically damped ease.
 * The analytic spring is frame-rate independent, starts gently, settles quickly,
 * and cannot overshoot a stationary target in either scroll direction.
 */
export function advanceMotion(state: MotionState, target: number, seconds: number): MotionState {
  const destination = clamp(target);
  const dt = Math.max(0, Math.min(seconds, 0.064));
  const displacement = state.position - destination;
  const springVelocity = state.velocity + displacement * MOTION_RESPONSE;
  const decay = Math.exp(-MOTION_RESPONSE * dt);
  const nextPosition = destination + (displacement + springVelocity * dt) * decay;
  const nextVelocity = (state.velocity - springVelocity * MOTION_RESPONSE * dt) * decay;

  const crossedTarget = (destination - state.position) * (destination - nextPosition) <= 0;
  if (
    crossedTarget ||
    (Math.abs(destination - nextPosition) < SETTLED_DISTANCE && Math.abs(nextVelocity) < SETTLED_VELOCITY)
  ) {
    return { position: destination, velocity: 0 };
  }

  return { position: clamp(nextPosition), velocity: nextVelocity };
}
