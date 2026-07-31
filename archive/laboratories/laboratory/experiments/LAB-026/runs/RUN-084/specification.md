# AetherAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.058567Z
**Run ID**: RUN-084
**Seed**: 1700000084

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: term_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: majority_quorum
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: tree_structure
- Commit Method: index_based

## Recovery

- Strategy: log_catchup
- Snapshot Policy: size_based

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 168ms
- Election Timeout Base: 221ms
- Election Timeout Range: 59ms

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

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:term_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:majority_quorum
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- concept:majority_quorum
- log:value_log
- log_structure:tree_structure
- commit:index_based
- recovery:log_catchup
- snapshot:size_based
- dynamic_membership:full_dynamic
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 60
- Elections Succeeded: 47
- Election Success Rate: 78.33%
- Messages Sent: 188
- Commits: 18
- Avg Messages/Commit: 10.44
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 56
- Elections Succeeded: 49
- Election Success Rate: 87.50%
- Messages Sent: 276
- Commits: 14
- Avg Messages/Commit: 19.71
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 68
- Elections Succeeded: 67
- Election Success Rate: 98.53%
- Messages Sent: 579
- Commits: 29
- Avg Messages/Commit: 19.97
- Leader Changes: 67
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 66
- Elections Succeeded: 62
- Election Success Rate: 93.94%
- Messages Sent: 526
- Commits: 16
- Avg Messages/Commit: 32.88
- Leader Changes: 62
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

