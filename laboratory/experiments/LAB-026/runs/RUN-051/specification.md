# SignalUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.339676Z
**Run ID**: RUN-051
**Seed**: 1700000051

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: term_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: hash_chain
- Commit Method: index_based

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: periodic

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: timing

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 50ms
- Election Timeout Base: 234ms
- Election Timeout Range: 112ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:term_based
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- log:command_log
- log_structure:hash_chain
- commit:index_based
- recovery:incremental_snapshot
- snapshot:periodic
- dynamic_membership:remove_node
- failure_detection:phi_accrual
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 34
- Election Success Rate: 56.67%
- Messages Sent: 172
- Commits: 23
- Avg Messages/Commit: 7.48
- Leader Changes: 34
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 58
- Elections Succeeded: 52
- Election Success Rate: 89.66%
- Messages Sent: 290
- Commits: 28
- Avg Messages/Commit: 10.36
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 54
- Election Success Rate: 98.18%
- Messages Sent: 459
- Commits: 28
- Avg Messages/Commit: 16.39
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 52
- Elections Succeeded: 52
- Election Success Rate: 100.00%
- Messages Sent: 473
- Commits: 49
- Avg Messages/Commit: 9.65
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

