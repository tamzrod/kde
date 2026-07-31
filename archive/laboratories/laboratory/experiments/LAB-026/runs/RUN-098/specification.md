# HelixProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.788795Z
**Run ID**: RUN-098
**Seed**: 1700000098

---

## Architecture

- Architecture: fully_distributed
- Node Type: heterogeneous
- Quorum Type: hierarchical

## Leader Election

- Method: rotation
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_if_log_newer
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: tree_structure
- Commit Method: majority_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: size_based

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: byzantine

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 147ms
- Election Timeout Base: 448ms
- Election Timeout Range: 141ms

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
- Liveness: True

---

## Discovered Features

- leader_election:rotation
- concept:term_epochs
- concept:randomized_timeout
- voting:flexible_quorum
- vote_granting:grant_if_log_newer
- concept:vote_revocations
- log:value_log
- log_structure:tree_structure
- commit:majority_commit
- recovery:incremental_snapshot
- snapshot:size_based
- dynamic_membership:joint_consensus
- failure_detection:explicit_probe

---

## Simulation Results

### 3 Nodes

- Election Attempts: 48
- Elections Succeeded: 34
- Election Success Rate: 70.83%
- Messages Sent: 138
- Commits: 18
- Avg Messages/Commit: 7.67
- Leader Changes: 34
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 66
- Elections Succeeded: 65
- Election Success Rate: 98.48%
- Messages Sent: 418
- Commits: 31
- Avg Messages/Commit: 13.48
- Leader Changes: 65
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 38
- Election Success Rate: 64.41%
- Messages Sent: 282
- Commits: 17
- Avg Messages/Commit: 16.59
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 58
- Elections Succeeded: 50
- Election Success Rate: 86.21%
- Messages Sent: 549
- Commits: 22
- Avg Messages/Commit: 24.95
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

