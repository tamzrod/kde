# NexusFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.124881Z
**Run ID**: RUN-009
**Seed**: 1700000009

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: tree_structure
- Commit Method: quorum_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: adaptive

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: timing

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 142ms
- Election Timeout Base: 480ms
- Election Timeout Range: 133ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- term_update

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_to_highest_term
- log:command_log
- log_structure:tree_structure
- commit:quorum_commit
- recovery:incremental_snapshot
- snapshot:adaptive
- dynamic_membership:remove_node
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 62
- Elections Succeeded: 41
- Election Success Rate: 66.13%
- Messages Sent: 177
- Commits: 23
- Avg Messages/Commit: 7.70
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 55
- Elections Succeeded: 43
- Election Success Rate: 78.18%
- Messages Sent: 269
- Commits: 19
- Avg Messages/Commit: 14.16
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 57
- Elections Succeeded: 57
- Election Success Rate: 100.00%
- Messages Sent: 544
- Commits: 25
- Avg Messages/Commit: 21.76
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 60
- Elections Succeeded: 56
- Election Success Rate: 93.33%
- Messages Sent: 534
- Commits: 17
- Avg Messages/Commit: 31.41
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

