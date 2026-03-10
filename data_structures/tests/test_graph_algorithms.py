from data_structures import Graph, bfs, dfs, dijkstra


def build_graph():
    g = Graph(directed=False)
    g.add_edge("A", "B", 1)
    g.add_edge("A", "C", 4)
    g.add_edge("B", "C", 2)
    g.add_edge("B", "D", 5)
    g.add_edge("C", "D", 1)
    return g


def test_bfs_order():
    g = build_graph()
    order = bfs(g, "A")
    assert order[0] == "A"
    assert set(order) == {"A", "B", "C", "D"}


def test_dfs_order():
    g = build_graph()
    order = dfs(g, "A")
    assert order[0] == "A"
    assert set(order) == {"A", "B", "C", "D"}


def test_dijkstra_distances():
    g = build_graph()
    dist, prev = dijkstra(g, "A")
    assert dist["A"] == 0
    assert dist["B"] == 1
    assert dist["C"] == 3
    assert dist["D"] == 4
    assert prev["D"] in {"B", "C"}
