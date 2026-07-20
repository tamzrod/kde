# HelixSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.233366Z
**Run ID**: RUN-011
**Seed**: 1700000011

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: id_based
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: linked_list
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: adaptive

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: timing

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 101ms
- Election Timeout Base: 362ms
- Election Timeout Range: 191ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- membership_change
- leader_announce

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:id_based
- concept:lease_based_leadership
- voting:hierarchical_quorum
- vote_granting:grant_to_candidate
- log:state_machine
- log_structure:linked_list
- commit:batch_commit
- recovery:state_transfer
- snapshot:adaptive
- dynamic_membership:full_dynamic
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 50
- Elections Succeeded: 37
- Election Success Rate: 74.00%
- Messages Sent: 135
- Commits: 10
- Avg Messages/Commit: 13.50
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 54
- Elections Succeeded: 44
- Election Success Rate: 81.48%
- Messages Sent: 250
- Commits: 20
- Avg Messages/Commit: 12.50
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 54
- Elections Succeeded: 50
- Election Success Rate: 92.59%
- Messages Sent: 408
- Commits: 19
- Avg Messages/Commit: 21.47
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 48
- Elections Succeeded: 46
- Election Success Rate: 95.83%
- Messages Sent: 467
- Commits: 21
- Avg Messages/Commit: 22.24
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

