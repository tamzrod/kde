# AnchorUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.526454Z
**Run ID**: RUN-093
**Seed**: 1700000093

---

## Architecture

- Architecture: centralized_leader
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: voting_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: flexible_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: size_based

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: omission

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 452ms
- Election Timeout Base: 274ms
- Election Timeout Range: 280ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: simple_state
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:voting_based
- concept:term_epochs
- voting:flexible_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- concept:majority_quorum
- log:replicated_log
- log_structure:ring_buffer
- commit:batch_commit
- recovery:hybrid_recovery
- snapshot:size_based
- dynamic_membership:joint_consensus
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 70
- Elections Succeeded: 53
- Election Success Rate: 75.71%
- Messages Sent: 192
- Commits: 25
- Avg Messages/Commit: 7.68
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 59
- Elections Succeeded: 45
- Election Success Rate: 76.27%
- Messages Sent: 244
- Commits: 4
- Avg Messages/Commit: 61.00
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 57
- Elections Succeeded: 50
- Election Success Rate: 87.72%
- Messages Sent: 492
- Commits: 25
- Avg Messages/Commit: 19.68
- Leader Changes: 50
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 57
- Elections Succeeded: 57
- Election Success Rate: 100.00%
- Messages Sent: 671
- Commits: 20
- Avg Messages/Commit: 33.55
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

