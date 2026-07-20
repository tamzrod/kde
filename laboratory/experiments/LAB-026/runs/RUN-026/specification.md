# BastionConsensus

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:46.017853Z
**Run ID**: RUN-026
**Seed**: 1700000026

---

## Architecture

- Architecture: decentralized
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: load_balanced
- Term/Epochs: True
- Randomized Timeout: True
- Lease-Based: False

## Voting

- Model: weighted_votes
- Vote Granting: grant_to_candidate
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: batch_commit

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: periodic

## Membership

- Model: full_dynamic
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: adaptive
- Model: crash_stop

## Timing

- Timeout Model: proportional
- Heartbeat Interval: 66ms
- Election Timeout Base: 221ms
- Election Timeout Range: 151ms

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
- Liveness: False

---

## Discovered Features

- leader_election:load_balanced
- concept:term_epochs
- concept:randomized_timeout
- voting:weighted_votes
- vote_granting:grant_to_candidate
- concept:vote_revocations
- log:value_log
- log_structure:ring_buffer
- commit:batch_commit
- recovery:hybrid_recovery
- snapshot:periodic
- dynamic_membership:full_dynamic
- failure_detection:adaptive

---

## Simulation Results

### 3 Nodes

- Election Attempts: 41
- Elections Succeeded: 38
- Election Success Rate: 92.68%
- Messages Sent: 171
- Commits: 17
- Avg Messages/Commit: 10.06
- Leader Changes: 38
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 55
- Elections Succeeded: 54
- Election Success Rate: 98.18%
- Messages Sent: 345
- Commits: 19
- Avg Messages/Commit: 18.16
- Leader Changes: 54
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 53
- Elections Succeeded: 52
- Election Success Rate: 98.11%
- Messages Sent: 423
- Commits: 26
- Avg Messages/Commit: 16.27
- Leader Changes: 52
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 59
- Elections Succeeded: 48
- Election Success Rate: 81.36%
- Messages Sent: 460
- Commits: 22
- Avg Messages/Commit: 20.91
- Leader Changes: 48
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

