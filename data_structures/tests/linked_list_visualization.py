import os
import sys
import matplotlib.pyplot as plt

sys.path.append(os.path.dirname(os.path.dirname(__file__)))

from data_structures.linked_list import LinkedList


def draw_linked_list(ll):

    temp = ll.head
    x = 0

    while temp:

        plt.text(x, 0, str(temp.data),
                 bbox=dict(boxstyle="round,pad=0.3"),
                 ha='center')

        if temp.next:
            plt.arrow(x+0.2, 0, 0.6, 0,
                      head_width=0.05,
                      length_includes_head=True)

        x += 1
        temp = temp.next

    plt.axis("off")
    plt.show()


ll = LinkedList()

ll.append(5)
ll.append(10)
ll.append(15)
ll.append(20)

draw_linked_list(ll)
