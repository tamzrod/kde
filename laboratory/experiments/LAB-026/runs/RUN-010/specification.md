# NovaAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.179251Z
**Run ID**: RUN-010
**Seed**: 1700000010

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: ring_buffer
- Commit Method: quorum_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: leader_change

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: explicit_probe
- Model: byzantine

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 349ms
- Election Timeout Base: 257ms
- Election Timeout Range: 179ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:lease_based_leadership
- voting:majority_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:command_log
- log_structure:ring_buffer
- commit:quorum_commit
- recovery:snapshot_transfer
- snapshot:leader_change
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 39
- Election Success Rate: 72.22%
- Messages Sent: 142
- Commits: 12
- Avg Messages/Commit: 11.83
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 58
- Elections Succeeded: 51
- Election Success Rate: 87.93%
- Messages Sent: 348
- Commits: 21
- Avg Messages/Commit: 16.57
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 58
- Elections Succeeded: 48
- Election Success Rate: 82.76%
- Messages Sent: 358
- Commits: 32
- Avg Messages/Commit: 11.19
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 60
- Elections Succeeded: 55
- Election Success Rate: 91.67%
- Messages Sent: 598
- Commits: 22
- Avg Messages/Commit: 27.18
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

