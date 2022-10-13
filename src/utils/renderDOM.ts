import Block from "./Block";

export function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root) {
    root.append(<Node>block.getContent()?.firstChild);

    block.dispatchComponentDidMount();

    return root;
  }
}
