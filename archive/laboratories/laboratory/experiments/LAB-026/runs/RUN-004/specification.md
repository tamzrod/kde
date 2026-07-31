# StratumAgreement

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:44.867945Z
**Run ID**: RUN-004
**Seed**: 1700000004

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: majority

## Leader Election

- Method: load_balanced
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_based_on_priority
- Vote Revocations: True

## Log Replication

- Type: hybrid
- Structure: tree_structure
- Commit Method: quorum_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: size_based

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: timing

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 337ms
- Election Timeout Base: 314ms
- Election Timeout Range: 137ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce

## State Machine

- Type: simple_state
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:load_balanced
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_based_on_priority
- concept:vote_revocations
- concept:majority_quorum
- log:hybrid
- log_structure:tree_structure
- commit:quorum_commit
- recovery:state_transfer
- snapshot:size_based
- dynamic_membership:joint_consensus
- failure_detection:adaptive
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 54
- Elections Succeeded: 41
- Election Success Rate: 75.93%
- Messages Sent: 154
- Commits: 13
- Avg Messages/Commit: 11.85
- Leader Changes: 41
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 35
- Elections Succeeded: 34
- Election Success Rate: 97.14%
- Messages Sent: 257
- Commits: 10
- Avg Messages/Commit: 25.70
- Leader Changes: 34
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 49
- Election Success Rate: 83.05%
- Messages Sent: 484
- Commits: 23
- Avg Messages/Commit: 21.04
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 55
- Elections Succeeded: 47
- Election Success Rate: 85.45%
- Messages Sent: 387
- Commits: 19
- Avg Messages/Commit: 20.37
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

