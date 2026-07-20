# AnchorCore

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.649646Z
**Run ID**: RUN-057
**Seed**: 1700000057

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: append_only_array
- Commit Method: majority_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: leader_change

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: omission

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 323ms
- Election Timeout Base: 447ms
- Election Timeout Range: 298ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_to_highest_term
- log:command_log
- log_structure:append_only_array
- commit:majority_commit
- recovery:incremental_snapshot
- snapshot:leader_change
- dynamic_membership:add_node
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 69
- Elections Succeeded: 56
- Election Success Rate: 81.16%
- Messages Sent: 200
- Commits: 25
- Avg Messages/Commit: 8.00
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 38
- Elections Succeeded: 33
- Election Success Rate: 86.84%
- Messages Sent: 218
- Commits: 14
- Avg Messages/Commit: 15.57
- Leader Changes: 33
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 48
- Election Success Rate: 81.36%
- Messages Sent: 419
- Commits: 14
- Avg Messages/Commit: 29.93
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 42
- Elections Succeeded: 42
- Election Success Rate: 100.00%
- Messages Sent: 524
- Commits: 20
- Avg Messages/Commit: 26.20
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

