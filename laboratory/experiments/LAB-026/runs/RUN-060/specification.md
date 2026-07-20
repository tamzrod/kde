# BeaconUnion

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.807219Z
**Run ID**: RUN-060
**Seed**: 1700000060

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: state_machine
- Structure: tree_structure
- Commit Method: batch_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: log_compaction

## Membership

- Model: joint_consensus
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: explicit_probe
- Model: crash_stop

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 298ms
- Election Timeout Base: 255ms
- Election Timeout Range: 252ms

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

- leader_election:random_winner
- concept:term_epochs
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:state_machine
- log_structure:tree_structure
- commit:batch_commit
- recovery:state_transfer
- snapshot:log_compaction
- dynamic_membership:joint_consensus
- failure_detection:explicit_probe
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 45
- Elections Succeeded: 28
- Election Success Rate: 62.22%
- Messages Sent: 124
- Commits: 14
- Avg Messages/Commit: 8.86
- Leader Changes: 28
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 39
- Election Success Rate: 73.58%
- Messages Sent: 273
- Commits: 20
- Avg Messages/Commit: 13.65
- Leader Changes: 39
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 49
- Elections Succeeded: 38
- Election Success Rate: 77.55%
- Messages Sent: 334
- Commits: 11
- Avg Messages/Commit: 30.36
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 45
- Elections Succeeded: 44
- Election Success Rate: 97.78%
- Messages Sent: 509
- Commits: 31
- Avg Messages/Commit: 16.42
- Leader Changes: 44
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

