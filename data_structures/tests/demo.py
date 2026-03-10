import os
import sys

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from data_structures.linked_list import LinkedList
from data_structures.stack import Stack
from data_structures.queue import Queue
from data_structures.binary_search_tree import BinarySearchTree
from data_structures.hash_table import HashTable


print("LINKED LIST")

ll = LinkedList()

ll.append(5)
ll.append(10)
ll.append(15)

ll.print_list()

print("\nSTACK")

s = Stack()

s.push(10)
s.push(20)

print(s.pop())


print("\nQUEUE")

q = Queue()

q.enqueue(1)
q.enqueue(2)

print(q.dequeue())


print("\nBINARY SEARCH TREE")

bst = BinarySearchTree()

bst.insert(8)
bst.insert(3)
bst.insert(10)
bst.insert(1)
bst.insert(6)

bst.inorder()


print("\nHASH TABLE")

ht = HashTable()

ht.insert("apple", 10)
ht.insert("banana", 20)

print(ht.get("apple"))
