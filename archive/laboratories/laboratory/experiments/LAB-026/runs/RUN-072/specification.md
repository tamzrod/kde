# StratumPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.431436Z
**Run ID**: RUN-072
**Seed**: 1700000072

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: quorum_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: remove_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: byzantine

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 98ms
- Election Timeout Base: 337ms
- Election Timeout Range: 184ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:flexible_quorum
- vote_granting:grant_to_highest_term
- log:value_log
- log_structure:ring_buffer
- commit:quorum_commit
- recovery:snapshot_transfer
- snapshot:adaptive
- dynamic_membership:remove_node
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 56
- Elections Succeeded: 30
- Election Success Rate: 53.57%
- Messages Sent: 152
- Commits: 10
- Avg Messages/Commit: 15.20
- Leader Changes: 30
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 62
- Elections Succeeded: 60
- Election Success Rate: 96.77%
- Messages Sent: 353
- Commits: 19
- Avg Messages/Commit: 18.58
- Leader Changes: 60
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 44
- Election Success Rate: 74.58%
- Messages Sent: 324
- Commits: 12
- Avg Messages/Commit: 27.00
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 51
- Elections Succeeded: 50
- Election Success Rate: 98.04%
- Messages Sent: 474
- Commits: 21
- Avg Messages/Commit: 22.57
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

