export function setNodesSize(
  node: SceneNode,
  options: {
    width: false | number;
    height: false | number;
    resizeWithConstraints: boolean;
  }
): void {
  const { width, height, resizeWithConstraints } = options;
  const newWidth = node.width + 100;
  const newHeight = node.height + 100;
  if (node.type === 'GROUP' || resizeWithConstraints === true) {
    node.resize(newWidth, newHeight);
  } else {
    node.resizeWithoutConstraints(newWidth, newHeight);
  }
}
