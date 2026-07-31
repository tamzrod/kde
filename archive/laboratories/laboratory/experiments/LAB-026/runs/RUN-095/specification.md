# PrismFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.630582Z
**Run ID**: RUN-095
**Seed**: 1700000095

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: adaptive

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_stop

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 94ms
- Election Timeout Base: 203ms
- Election Timeout Range: 124ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:random_winner
- concept:term_epochs
- voting:flexible_quorum
- vote_granting:grant_to_highest_term
- concept:majority_quorum
- log:state_machine
- log_structure:linked_list
- commit:majority_commit
- recovery:incremental_snapshot
- snapshot:adaptive
- dynamic_membership:remove_node
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 46
- Election Success Rate: 77.97%
- Messages Sent: 176
- Commits: 12
- Avg Messages/Commit: 14.67
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 53
- Election Success Rate: 100.00%
- Messages Sent: 277
- Commits: 16
- Avg Messages/Commit: 17.31
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 42
- Election Success Rate: 71.19%
- Messages Sent: 282
- Commits: 13
- Avg Messages/Commit: 21.69
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 56
- Elections Succeeded: 56
- Election Success Rate: 100.00%
- Messages Sent: 563
- Commits: 38
- Avg Messages/Commit: 14.82
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

