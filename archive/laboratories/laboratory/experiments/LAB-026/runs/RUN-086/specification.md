# StratumProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.161575Z
**Run ID**: RUN-086
**Seed**: 1700000086

---

## Architecture

- Architecture: hierarchical
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: read_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: size_based

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: crash_recovery

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 195ms
- Election Timeout Base: 233ms
- Election Timeout Range: 140ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:random_winner
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:read_quorum
- vote_granting:grant_based_on_priority
- log:hybrid
- log_structure:linked_list
- commit:batch_commit
- recovery:state_transfer
- snapshot:size_based
- dynamic_membership:single_config
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 52
- Elections Succeeded: 41
- Election Success Rate: 78.85%
- Messages Sent: 190
- Commits: 16
- Avg Messages/Commit: 11.88
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 50
- Election Success Rate: 89.29%
- Messages Sent: 298
- Commits: 14
- Avg Messages/Commit: 21.29
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 54
- Elections Succeeded: 54
- Election Success Rate: 100.00%
- Messages Sent: 558
- Commits: 36
- Avg Messages/Commit: 15.50
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 61
- Election Success Rate: 96.83%
- Messages Sent: 547
- Commits: 26
- Avg Messages/Commit: 21.04
- Leader Changes: 61
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

