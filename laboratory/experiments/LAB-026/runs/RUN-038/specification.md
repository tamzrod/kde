# NovaCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.647657Z
**Run ID**: RUN-038
**Seed**: 1700000038

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: timestamp_based
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: weighted_votes
- Vote Granting: grant_if_no_voted
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: adaptive

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: crash_recovery

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 385ms
- Election Timeout Base: 240ms
- Election Timeout Range: 246ms

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

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:term_epochs
- concept:lease_based_leadership
- voting:weighted_votes
- vote_granting:grant_if_no_voted
- log:hybrid
- log_structure:linked_list
- commit:majority_commit
- recovery:log_catchup
- snapshot:adaptive
- dynamic_membership:joint_consensus
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 62
- Elections Succeeded: 43
- Election Success Rate: 69.35%
- Messages Sent: 180
- Commits: 21
- Avg Messages/Commit: 8.57
- Leader Changes: 43
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 52
- Elections Succeeded: 51
- Election Success Rate: 98.08%
- Messages Sent: 294
- Commits: 16
- Avg Messages/Commit: 18.38
- Leader Changes: 51
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 57
- Elections Succeeded: 47
- Election Success Rate: 82.46%
- Messages Sent: 330
- Commits: 21
- Avg Messages/Commit: 15.71
- Leader Changes: 47
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 69
- Elections Succeeded: 67
- Election Success Rate: 97.10%
- Messages Sent: 766
- Commits: 23
- Avg Messages/Commit: 33.30
- Leader Changes: 67
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

