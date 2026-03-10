import os
import sys
import matplotlib.pyplot as plt

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from data_structures.binary_search_tree import BinarySearchTree


def draw_tree(node, x, y, dx):

    if node is None:
        return

    plt.text(x, y, str(node.key),
             ha='center',
             va='center',
             bbox=dict(boxstyle="circle"))

    if node.left:
        plt.plot([x, x-dx], [y, y-1])
        draw_tree(node.left, x-dx, y-1, dx/2)

    if node.right:
        plt.plot([x, x+dx], [y, y-1])
        draw_tree(node.right, x+dx, y-1, dx/2)


bst = BinarySearchTree()

values = [8,3,10,1,6,14,4,7,13]

for v in values:
    bst.insert(v)

plt.figure(figsize=(8,6))

draw_tree(bst.root, 0, 0, 3)

plt.axis("off")
plt.show()
