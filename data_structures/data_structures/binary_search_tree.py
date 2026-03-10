class Node:

    def __init__(self, key):
        self.key = key
        self.left = None
        self.right = None


class BinarySearchTree:

    def __init__(self):
        self.root = None


    def insert(self, key):

        if self.root is None:
            self.root = Node(key)
        else:
            self._insert(self.root, key)


    def _insert(self, node, key):

        if key < node.key:

            if node.left is None:
                node.left = Node(key)
            else:
                self._insert(node.left, key)

        else:

            if node.right is None:
                node.right = Node(key)
            else:
                self._insert(node.right, key)


    def search(self, key):
        return self._search(self.root, key)


    def _search(self, node, key):

        if node is None:
            return False

        if node.key == key:
            return True

        if key < node.key:
            return self._search(node.left, key)

        return self._search(node.right, key)


    def inorder(self):
        self._inorder(self.root)
        print()


    def _inorder(self, node):

        if node:

            self._inorder(node.left)

            print(node.key, end=" ")

            self._inorder(node.right)