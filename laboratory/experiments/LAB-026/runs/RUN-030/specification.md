# AnchorSync

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.226740Z
**Run ID**: RUN-030
**Seed**: 1700000030

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: command_log
- Structure: append_only_array
- Commit Method: index_based

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: log_compaction

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: omission

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 180ms
- Election Timeout Base: 418ms
- Election Timeout Range: 57ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat

## State Machine

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:command_log
- log_structure:append_only_array
- commit:index_based
- recovery:snapshot_transfer
- snapshot:log_compaction
- dynamic_membership:single_config
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 51
- Elections Succeeded: 39
- Election Success Rate: 76.47%
- Messages Sent: 181
- Commits: 10
- Avg Messages/Commit: 18.10
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 60
- Elections Succeeded: 55
- Election Success Rate: 91.67%
- Messages Sent: 330
- Commits: 12
- Avg Messages/Commit: 27.50
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 45
- Election Success Rate: 88.24%
- Messages Sent: 405
- Commits: 20
- Avg Messages/Commit: 20.25
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 51
- Elections Succeeded: 50
- Election Success Rate: 98.04%
- Messages Sent: 397
- Commits: 17
- Avg Messages/Commit: 23.35
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

