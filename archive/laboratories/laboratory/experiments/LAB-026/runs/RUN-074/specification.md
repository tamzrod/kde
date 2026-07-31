# PrismProtocol

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:48.538402Z
**Run ID**: RUN-074
**Seed**: 1700000074

---

## Architecture

- Architecture: hierarchical
- Node Type: uniform
- Quorum Type: hierarchical

## Leader Election

- Method: voting_based
- Term/Epochs: False
- Randomized Timeout: True
- Lease-Based: True

## Voting

- Model: hierarchical_quorum
- Vote Granting: grant_to_highest_term
- Vote Revocations: True

## Log Replication

- Type: replicated_log
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: log_catchup
- Snapshot Policy: log_compaction

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: swim_like
- Model: crash_recovery

## Timing

- Timeout Model: exponential
- Heartbeat Interval: 217ms
- Election Timeout Base: 371ms
- Election Timeout Range: 248ms

## Message Types

- vote_request
- vote_response
- append_entries
- append_response
- heartbeat
- membership_change
- leader_announce

## State Machine

- Type: lua_script
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:voting_based
- concept:randomized_timeout
- concept:lease_based_leadership
- voting:hierarchical_quorum
- vote_granting:grant_to_highest_term
- concept:vote_revocations
- log:replicated_log
- log_structure:ring_buffer
- commit:batch_commit
- recovery:log_catchup
- snapshot:log_compaction
- dynamic_membership:full_dynamic
- failure_detection:swim_like

---

## Simulation Results

### 3 Nodes

- Election Attempts: 56
- Elections Succeeded: 40
- Election Success Rate: 71.43%
- Messages Sent: 182
- Commits: 20
- Avg Messages/Commit: 9.10
- Leader Changes: 40
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 68
- Elections Succeeded: 66
- Election Success Rate: 97.06%
- Messages Sent: 414
- Commits: 25
- Avg Messages/Commit: 16.56
- Leader Changes: 66
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 54
- Elections Succeeded: 53
- Election Success Rate: 98.15%
- Messages Sent: 430
- Commits: 20
- Avg Messages/Commit: 21.50
- Leader Changes: 53
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 49
- Elections Succeeded: 46
- Election Success Rate: 93.88%
- Messages Sent: 572
- Commits: 16
- Avg Messages/Commit: 35.75
- Leader Changes: 46
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

