# PrismSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.545833Z
**Run ID**: RUN-055
**Seed**: 1700000055

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: tree_structure
- Commit Method: batch_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: periodic

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: crash_stop

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 473ms
- Election Timeout Base: 304ms
- Election Timeout Range: 220ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:timestamp_based
- voting:majority_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:command_log
- log_structure:tree_structure
- commit:batch_commit
- recovery:hybrid_recovery
- snapshot:periodic
- dynamic_membership:full_dynamic
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 56
- Elections Succeeded: 38
- Election Success Rate: 67.86%
- Messages Sent: 176
- Commits: 19
- Avg Messages/Commit: 9.26
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 52
- Elections Succeeded: 38
- Election Success Rate: 73.08%
- Messages Sent: 213
- Commits: 18
- Avg Messages/Commit: 11.83
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 40
- Election Success Rate: 78.43%
- Messages Sent: 286
- Commits: 11
- Avg Messages/Commit: 26.00
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 50
- Elections Succeeded: 50
- Election Success Rate: 100.00%
- Messages Sent: 605
- Commits: 13
- Avg Messages/Commit: 46.54
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

