export function calculateVariance(original, updated) {
    if (original === 0) return 0;
    return (((updated - original) / original) * 100).toFixed(2);
  }
  
  export function updateChildren(children, newTotal) {
    const total = children.reduce((acc, child) => acc + child.value, 0);
    return children.map((child) => {
      const variance = total === 0 ? 1 / children.length : child.value / total;
      const updatedValue = parseFloat((variance * newTotal).toFixed(4));
      return { ...child, value: updatedValue };
    });
  }
  