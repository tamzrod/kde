# SignalUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.647905Z
**Run ID**: RUN-019
**Seed**: 1700000019

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: majority_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: False

## Log Replication

- Type: state_machine
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: log_compaction

## Membership

- Model: add_node
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: crash_recovery

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 201ms
- Election Timeout Base: 321ms
- Election Timeout Range: 139ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:majority_quorum
- vote_granting:grant_to_candidate
- log:state_machine
- log_structure:append_only_array
- commit:index_based
- recovery:hybrid_recovery
- snapshot:log_compaction
- dynamic_membership:add_node
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 40
- Elections Succeeded: 28
- Election Success Rate: 70.00%
- Messages Sent: 119
- Commits: 10
- Avg Messages/Commit: 11.90
- Leader Changes: 28
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 60
- Elections Succeeded: 49
- Election Success Rate: 81.67%
- Messages Sent: 242
- Commits: 20
- Avg Messages/Commit: 12.10
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 55
- Elections Succeeded: 55
- Election Success Rate: 100.00%
- Messages Sent: 568
- Commits: 22
- Avg Messages/Commit: 25.82
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 48
- Elections Succeeded: 44
- Election Success Rate: 91.67%
- Messages Sent: 360
- Commits: 24
- Avg Messages/Commit: 15.00
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

