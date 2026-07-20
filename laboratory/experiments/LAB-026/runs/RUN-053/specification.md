# BastionProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.442887Z
**Run ID**: RUN-053
**Seed**: 1700000053

---

## Architecture

- Architecture: fully_distributed
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: flexible_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: append_only_array
- Commit Method: pipeline_commit

## Recovery

- Strategy: snapshot_transfer
- Snapshot Policy: adaptive

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: byzantine

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 250ms
- Election Timeout Base: 218ms
- Election Timeout Range: 184ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot

## State Machine

- Type: simple_state
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- concept:lease_based_leadership
- voting:flexible_quorum
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:replicated_log
- log_structure:append_only_array
- commit:pipeline_commit
- recovery:snapshot_transfer
- snapshot:adaptive
- dynamic_membership:joint_consensus
- failure_detection:adaptive
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 51
- Elections Succeeded: 42
- Election Success Rate: 82.35%
- Messages Sent: 185
- Commits: 14
- Avg Messages/Commit: 13.21
- Leader Changes: 42
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 51
- Elections Succeeded: 38
- Election Success Rate: 74.51%
- Messages Sent: 254
- Commits: 19
- Avg Messages/Commit: 13.37
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 60
- Elections Succeeded: 56
- Election Success Rate: 93.33%
- Messages Sent: 505
- Commits: 30
- Avg Messages/Commit: 16.83
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 62
- Elections Succeeded: 62
- Election Success Rate: 100.00%
- Messages Sent: 675
- Commits: 26
- Avg Messages/Commit: 25.96
- Leader Changes: 62
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

