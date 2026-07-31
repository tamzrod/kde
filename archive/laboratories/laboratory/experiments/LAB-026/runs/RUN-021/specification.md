# NovaCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.754182Z
**Run ID**: RUN-021
**Seed**: 1700000021

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: ring_buffer
- Commit Method: pipeline_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: log_compaction

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: omission

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 259ms
- Election Timeout Base: 475ms
- Election Timeout Range: 165ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- snapshot
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: False

---

## Discovered Features

- leader_election:random_winner
- concept:term_epochs
- voting:write_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- concept:majority_quorum
- log:state_machine
- log_structure:ring_buffer
- commit:pipeline_commit
- recovery:state_transfer
- snapshot:log_compaction
- dynamic_membership:joint_consensus
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 59
- Elections Succeeded: 54
- Election Success Rate: 91.53%
- Messages Sent: 223
- Commits: 28
- Avg Messages/Commit: 7.96
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 61
- Elections Succeeded: 58
- Election Success Rate: 95.08%
- Messages Sent: 376
- Commits: 28
- Avg Messages/Commit: 13.43
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 59
- Elections Succeeded: 53
- Election Success Rate: 89.83%
- Messages Sent: 471
- Commits: 20
- Avg Messages/Commit: 23.55
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 61
- Elections Succeeded: 57
- Election Success Rate: 93.44%
- Messages Sent: 514
- Commits: 23
- Avg Messages/Commit: 22.35
- Leader Changes: 57
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

