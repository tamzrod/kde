# PrismSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.484464Z
**Run ID**: RUN-073
**Seed**: 1700000073

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: flexible

## Leader Election

- Method: lease_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: append_only_array
- Commit Method: pipeline_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: log_compaction

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: phi_accrual
- Model: timing

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 462ms
- Election Timeout Base: 239ms
- Election Timeout Range: 203ms

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

- leader_election:lease_based
- concept:randomized_timeout
- voting:majority_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- log:value_log
- log_structure:append_only_array
- commit:pipeline_commit
- recovery:log_catchup
- snapshot:log_compaction
- dynamic_membership:single_config
- failure_detection:phi_accrual

---

## Simulation Results

### 3 Nodes

- Election Attempts: 57
- Elections Succeeded: 50
- Election Success Rate: 87.72%
- Messages Sent: 181
- Commits: 17
- Avg Messages/Commit: 10.65
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 59
- Elections Succeeded: 49
- Election Success Rate: 83.05%
- Messages Sent: 281
- Commits: 26
- Avg Messages/Commit: 10.81
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 54
- Elections Succeeded: 51
- Election Success Rate: 94.44%
- Messages Sent: 358
- Commits: 22
- Avg Messages/Commit: 16.27
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 60
- Elections Succeeded: 58
- Election Success Rate: 96.67%
- Messages Sent: 603
- Commits: 26
- Avg Messages/Commit: 23.19
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

