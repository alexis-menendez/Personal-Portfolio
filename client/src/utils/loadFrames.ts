// file: client/src/utils/loadFrames.ts

// Utility to load animation frames for a given animation key and frame count
export function loadFrames(animation: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => {
    const frameNum = String(i + 1).padStart(2, '0'); 
    return `/assets/squid/${animation}/squid-${animation}${frameNum}.png`;
  });
}
