class PriorityQueue:

    def __init__(self):
        self.data = []

    def push(self, priority, item):
        self.data.append((priority, item))
        self.data.sort(key=lambda x: x[0])

    def pop(self):

        if len(self.data) == 0:
            return None

        return self.data.pop(0)[1]

    def peek(self):

        if len(self.data) == 0:
            return None

        return self.data[0][1]

    def is_empty(self):
        return len(self.data) == 0