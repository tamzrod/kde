# HelixFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.642364Z
**Run ID**: RUN-076
**Seed**: 1700000076

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: pipeline_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: log_compaction

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: omission

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 153ms
- Election Timeout Base: 421ms
- Election Timeout Range: 146ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_based_on_priority
- log:value_log
- log_structure:ring_buffer
- commit:pipeline_commit
- recovery:state_transfer
- snapshot:log_compaction
- dynamic_membership:single_config
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 62
- Elections Succeeded: 52
- Election Success Rate: 83.87%
- Messages Sent: 201
- Commits: 23
- Avg Messages/Commit: 8.74
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 69
- Elections Succeeded: 61
- Election Success Rate: 88.41%
- Messages Sent: 323
- Commits: 31
- Avg Messages/Commit: 10.42
- Leader Changes: 61
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 57
- Elections Succeeded: 57
- Election Success Rate: 100.00%
- Messages Sent: 511
- Commits: 22
- Avg Messages/Commit: 23.23
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 66
- Elections Succeeded: 66
- Election Success Rate: 100.00%
- Messages Sent: 792
- Commits: 27
- Avg Messages/Commit: 29.33
- Leader Changes: 66
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

