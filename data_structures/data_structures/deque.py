class Deque:

    def __init__(self):
        self.data = []

    def push_front(self, value):
        self.data.insert(0, value)

    def push_back(self, value):
        self.data.append(value)

    def pop_front(self):

        if len(self.data) == 0:
            return None

        return self.data.pop(0)

    def pop_back(self):

        if len(self.data) == 0:
            return None

        return self.data.pop()

    def peek_front(self):

        if len(self.data) == 0:
            return None

        return self.data[0]

    def peek_back(self):

        if len(self.data) == 0:
            return None

        return self.data[-1]

    def is_empty(self):
        return len(self.data) == 0