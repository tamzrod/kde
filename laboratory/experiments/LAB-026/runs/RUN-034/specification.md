# BastionAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.439851Z
**Run ID**: RUN-034
**Seed**: 1700000034

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: periodic

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: omission

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 275ms
- Election Timeout Base: 414ms
- Election Timeout Range: 275ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:hybrid
- log_structure:ring_buffer
- commit:batch_commit
- recovery:incremental_snapshot
- snapshot:periodic
- dynamic_membership:single_config
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 53
- Elections Succeeded: 42
- Election Success Rate: 79.25%
- Messages Sent: 187
- Commits: 13
- Avg Messages/Commit: 14.38
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 49
- Elections Succeeded: 42
- Election Success Rate: 85.71%
- Messages Sent: 234
- Commits: 28
- Avg Messages/Commit: 8.36
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 44
- Election Success Rate: 80.00%
- Messages Sent: 269
- Commits: 11
- Avg Messages/Commit: 24.45
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 55
- Election Success Rate: 100.00%
- Messages Sent: 622
- Commits: 25
- Avg Messages/Commit: 24.88
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

