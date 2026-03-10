from data_structures import linear_search, binary_search


def test_linear_search_found():
    arr = [5, 8, 2, 9]
    assert linear_search(arr, 2) == 2


def test_linear_search_not_found():
    arr = [5, 8, 2, 9]
    assert linear_search(arr, 7) == -1


def test_binary_search_found():
    arr = [1, 3, 5, 7, 9]
    assert binary_search(arr, 7) == 3


def test_binary_search_not_found():
    arr = [1, 3, 5, 7, 9]
    assert binary_search(arr, 6) == -1
