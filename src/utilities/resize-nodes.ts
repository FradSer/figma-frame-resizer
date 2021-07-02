export function resizeNodes(
  resizeEdgeSize: number,
  node: SceneNode,
  options: {
    width: false | number;
    height: false | number;
    resizeWithConstraints: boolean;
  }
): void {
  const { width, height, resizeWithConstraints } = options;
  const newWidth = node.width + resizeEdgeSize * 2;
  const newHeight = node.height + resizeEdgeSize * 2;

  if (node.type === 'GROUP' || resizeWithConstraints === true) {
    node.resize(newWidth, newHeight);
  } else {
    node.resizeWithoutConstraints(newWidth, newHeight);
  }

  if ('children' in node) {
    const children = node.children;
    for (const child of children) {
      child.x += resizeEdgeSize;
      child.y += resizeEdgeSize;
    }
  }
}
