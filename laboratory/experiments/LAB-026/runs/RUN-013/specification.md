# PrismCoordination

**Version**: 1.0.0
**Generated**: 2026-07-20T19:56:45.337346Z
**Run ID**: RUN-013
**Seed**: 1700000013

---

## Architecture

- Architecture: centralized_leader
- Node Type: uniform
- Quorum Type: flexible

## Leader Election

- Method: timestamp_based
- Term/Epochs: False
- Randomized Timeout: False
- Lease-Based: True

## Voting

- Model: majority_quorum
- Vote Granting: grant_if_no_voted
- Vote Revocations: True

## Log Replication

- Type: value_log
- Structure: ring_buffer
- Commit Method: index_based

## Recovery

- Strategy: hybrid_recovery
- Snapshot Policy: adaptive

## Membership

- Model: single_config
- Add Node: consensus_required
- Remove Node: consensus_required

## Failure Handling

- Detection: gossip
- Model: omission

## Timing

- Timeout Model: adaptive
- Heartbeat Interval: 150ms
- Election Timeout Base: 414ms
- Election Timeout Range: 117ms

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

- Type: deterministic
- Safety: True
- Liveness: True

---

## Discovered Features

- leader_election:timestamp_based
- concept:lease_based_leadership
- voting:majority_quorum
- vote_granting:grant_if_no_voted
- concept:vote_revocations
- log:value_log
- log_structure:ring_buffer
- commit:index_based
- recovery:hybrid_recovery
- snapshot:adaptive
- dynamic_membership:single_config
- failure_detection:gossip

---

## Simulation Results

### 3 Nodes

- Election Attempts: 57
- Elections Succeeded: 45
- Election Success Rate: 78.95%
- Messages Sent: 195
- Commits: 21
- Avg Messages/Commit: 9.29
- Leader Changes: 45
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 5 Nodes

- Election Attempts: 50
- Elections Succeeded: 37
- Election Success Rate: 74.00%
- Messages Sent: 235
- Commits: 24
- Avg Messages/Commit: 9.79
- Leader Changes: 37
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 7 Nodes

- Election Attempts: 63
- Elections Succeeded: 55
- Election Success Rate: 87.30%
- Messages Sent: 330
- Commits: 20
- Avg Messages/Commit: 16.50
- Leader Changes: 55
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

### 9 Nodes

- Election Attempts: 49
- Elections Succeeded: 49
- Election Success Rate: 100.00%
- Messages Sent: 594
- Commits: 28
- Avg Messages/Commit: 21.21
- Leader Changes: 49
- Leader Stability: 0.00%
- Safety Check: PASS
- Liveness Check: PASS

