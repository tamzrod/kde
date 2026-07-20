# CipherAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.222352Z
**Run ID**: RUN-068
**Seed**: 1700000068

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: weighted

## Leader Election

- Method: id_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: weighted_votes
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: leader_change

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: byzantine

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 482ms
- Election Timeout Base: 224ms
- Election Timeout Range: 177ms

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

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:id_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:weighted_votes
- vote_granting:grant_to_highest_term
- log:command_log
- log_structure:ring_buffer
- commit:batch_commit
- recovery:snapshot_transfer
- snapshot:leader_change
- dynamic_membership:full_dynamic
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 47
- Elections Succeeded: 39
- Election Success Rate: 82.98%
- Messages Sent: 148
- Commits: 21
- Avg Messages/Commit: 7.05
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 52
- Elections Succeeded: 32
- Election Success Rate: 61.54%
- Messages Sent: 212
- Commits: 14
- Avg Messages/Commit: 15.14
- Leader Changes: 32
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 52
- Elections Succeeded: 47
- Election Success Rate: 90.38%
- Messages Sent: 456
- Commits: 18
- Avg Messages/Commit: 25.33
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 59
- Election Success Rate: 100.00%
- Messages Sent: 645
- Commits: 22
- Avg Messages/Commit: 29.32
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

