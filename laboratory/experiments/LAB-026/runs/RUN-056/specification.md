# StratumCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.596798Z
**Run ID**: RUN-056
**Seed**: 1700000056

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: term_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: index_based

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: log_compaction

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_stop

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 472ms
- Election Timeout Base: 453ms
- Election Timeout Range: 50ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:term_based
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:replicated_log
- log_structure:hash_chain
- commit:index_based
- recovery:incremental_snapshot
- snapshot:log_compaction
- dynamic_membership:remove_node
- failure_detection:swim_like
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 65
- Elections Succeeded: 62
- Election Success Rate: 95.38%
- Messages Sent: 258
- Commits: 21
- Avg Messages/Commit: 12.29
- Leader Changes: 62
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 58
- Elections Succeeded: 51
- Election Success Rate: 87.93%
- Messages Sent: 243
- Commits: 14
- Avg Messages/Commit: 17.36
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 47
- Elections Succeeded: 40
- Election Success Rate: 85.11%
- Messages Sent: 339
- Commits: 22
- Avg Messages/Commit: 15.41
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 56
- Elections Succeeded: 45
- Election Success Rate: 80.36%
- Messages Sent: 419
- Commits: 20
- Avg Messages/Commit: 20.95
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

