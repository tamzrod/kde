# PrismCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:47.858936Z
**Run ID**: RUN-061
**Seed**: 1700000061

---

## Architecture

- Architecture: ring_based
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: random_winner
- Term/Epochs: True
- Randomized Timeout: False
- Lease-Based: False

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: hash_chain
- Commit Method: majority_commit

## Recovery

- Strategy: incremental_snapshot
- Snapshot Policy: size_based

## Membership

- Model: static
- Add Node: 
- Remove Node: 

## Failure Handling

- Detection: adaptive
- Model: crash_recovery

## Timing

- Timeout Model: fixed
- Heartbeat Interval: 53ms
- Election Timeout Base: 418ms
- Election Timeout Range: 194ms

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
- Liveness: True

---

## Discovered Features

- leader_election:random_winner
- concept:term_epochs
- voting:hierarchical_quorum
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:replicated_log
- log_structure:hash_chain
- commit:majority_commit
- recovery:incremental_snapshot
- snapshot:size_based
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 48
- Elections Succeeded: 40
- Election Success Rate: 83.33%
- Messages Sent: 184
- Commits: 22
- Avg Messages/Commit: 8.36
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 46
- Elections Succeeded: 40
- Election Success Rate: 86.96%
- Messages Sent: 253
- Commits: 22
- Avg Messages/Commit: 11.50
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 51
- Elections Succeeded: 49
- Election Success Rate: 96.08%
- Messages Sent: 348
- Commits: 32
- Avg Messages/Commit: 10.88
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 56
- Elections Succeeded: 55
- Election Success Rate: 98.21%
- Messages Sent: 511
- Commits: 13
- Avg Messages/Commit: 39.31
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

