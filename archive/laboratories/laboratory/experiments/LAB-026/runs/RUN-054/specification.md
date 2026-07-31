# AnchorPact

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.495265Z
**Run ID**: RUN-054
**Seed**: 1700000054

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: weighted

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: write_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: ring_buffer
- Commit Method: quorum_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: periodic

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: timing

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 270ms
- Election Timeout Base: 452ms
- Election Timeout Range: 173ms

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

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:write_quorum
- vote_granting:grant_if_log_newer
- log:hybrid
- log_structure:ring_buffer
- commit:quorum_commit
- recovery:incremental_snapshot
- snapshot:periodic
- dynamic_membership:joint_consensus
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 65
- Elections Succeeded: 55
- Election Success Rate: 84.62%
- Messages Sent: 226
- Commits: 31
- Avg Messages/Commit: 7.29
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 54
- Elections Succeeded: 46
- Election Success Rate: 85.19%
- Messages Sent: 265
- Commits: 19
- Avg Messages/Commit: 13.95
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 48
- Elections Succeeded: 47
- Election Success Rate: 97.92%
- Messages Sent: 343
- Commits: 13
- Avg Messages/Commit: 26.38
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 63
- Elections Succeeded: 62
- Election Success Rate: 98.41%
- Messages Sent: 684
- Commits: 19
- Avg Messages/Commit: 36.00
- Leader Changes: 62
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

