# HelixConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.391814Z
**Run ID**: RUN-052
**Seed**: 1700000052

---

## Architecture

- Architecture: decentralized
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: random_winner
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_based_on_priority
- Vote Revocations: False

## Log Replication

- Type: value_log
- Structure: linked_list
- Commit Method: majority_commit

## Recovery

- Strategy: state_transfer
- Snapshot Policy: size_based

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: timing

## Timing

- Timeout Model: randomized
- Heartbeat Interval: 224ms
- Election Timeout Base: 443ms
- Election Timeout Range: 135ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- leader_announce
- term_update

## State Machine

- Type: fsm
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:random_winner
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_based_on_priority
- concept:majority_quorum
- log:value_log
- log_structure:linked_list
- commit:majority_commit
- recovery:state_transfer
- snapshot:size_based
- dynamic_membership:full_dynamic
- failure_detection:swim_like
- concept:randomized_election_timeout

---

## Simulation Results

### 3 Nodes

- Election Attempts: 55
- Elections Succeeded: 52
- Election Success Rate: 94.55%
- Messages Sent: 221
- Commits: 15
- Avg Messages/Commit: 14.73
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 75
- Elections Succeeded: 75
- Election Success Rate: 100.00%
- Messages Sent: 405
- Commits: 24
- Avg Messages/Commit: 16.88
- Leader Changes: 75
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 47
- Elections Succeeded: 46
- Election Success Rate: 97.87%
- Messages Sent: 414
- Commits: 22
- Avg Messages/Commit: 18.82
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 58
- Elections Succeeded: 58
- Election Success Rate: 100.00%
- Messages Sent: 652
- Commits: 27
- Avg Messages/Commit: 24.15
- Leader Changes: 58
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

