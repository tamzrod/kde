# AetherFlow

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.702124Z
**Run ID**: RUN-020
**Seed**: 1700000020

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: term_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: read_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: command_log
- Structure: linked_list
- Commit Method: pipeline_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: adaptive

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 157ms
- Election Timeout Base: 312ms
- Election Timeout Range: 259ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce
- term_update

## State Machine

- Type: deterministic
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:term_based
- concept:randomized_timeout
- voting:read_quorum
- vote_granting:grant_if_log_newer
- log:command_log
- log_structure:linked_list
- commit:pipeline_commit
- recovery:incremental_snapshot
- snapshot:adaptive
- dynamic_membership:joint_consensus
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 49
- Elections Succeeded: 42
- Election Success Rate: 85.71%
- Messages Sent: 150
- Commits: 18
- Avg Messages/Commit: 8.33
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 50
- Elections Succeeded: 38
- Election Success Rate: 76.00%
- Messages Sent: 226
- Commits: 16
- Avg Messages/Commit: 14.12
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 68
- Elections Succeeded: 64
- Election Success Rate: 94.12%
- Messages Sent: 458
- Commits: 23
- Avg Messages/Commit: 19.91
- Leader Changes: 64
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 59
- Election Success Rate: 100.00%
- Messages Sent: 635
- Commits: 27
- Avg Messages/Commit: 23.52
- Leader Changes: 59
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

