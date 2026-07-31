# NexusConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:49.317115Z
**Run ID**: RUN-089
**Seed**: 1700000089

---

## Architecture

- Architecture: ring_based
- Node Type: heterogeneous
- Quorum Type: majority

## Leader Election

- Method: lease_based
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: write_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: False

## Log Replication

- Type: hybrid
- Structure: hash_chain
- Commit Method: index_based

## Recovery

- Strategy: log_catchup
- Snapshot Policy: leader_change

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: heartbeat
- Model: crash_recovery

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 191ms
- Election Timeout Base: 328ms
- Election Timeout Range: 113ms

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

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:lease_based
- concept:term_epochs
- concept:randomized_timeout
- voting:write_quorum
- vote_granting:grant_to_highest_term
- concept:majority_quorum
- log:hybrid
- log_structure:hash_chain
- commit:index_based
- recovery:log_catchup
- snapshot:leader_change
- dynamic_membership:single_config
- failure_detection:heartbeat
- concept:heartbeat

---

## Simulation Results

### 3 Nodes

- Election Attempts: 67
- Elections Succeeded: 53
- Election Success Rate: 79.10%
- Messages Sent: 220
- Commits: 22
- Avg Messages/Commit: 10.00
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 53
- Elections Succeeded: 48
- Election Success Rate: 90.57%
- Messages Sent: 318
- Commits: 28
- Avg Messages/Commit: 11.36
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 52
- Elections Succeeded: 45
- Election Success Rate: 86.54%
- Messages Sent: 382
- Commits: 20
- Avg Messages/Commit: 19.10
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 56
- Election Success Rate: 94.92%
- Messages Sent: 529
- Commits: 27
- Avg Messages/Commit: 19.59
- Leader Changes: 56
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

